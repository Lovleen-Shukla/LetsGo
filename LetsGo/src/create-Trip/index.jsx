import React, { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from "@/components/ui/input";
import { SelectTravelesList, SelectBudgetOptions, AI_PROMPT } from '@/constants/options';
import { Toaster, toast } from 'sonner';
import { chatSession } from '@/service/AIModel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore"; // Adjust path if needed
import { db } from '@/service/fireBaseConfig'; 
import { useNavigate } from 'react-router-dom';


function CreateTrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false); // Fixed typo, consistent naming
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();
    const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log(codeResp);
      GetuserProfile(codeResp);
    },
    onError: (error) => console.log(error)
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true); // Open the dialog if user is not logged in
      return;
    }
    if ((formData?.noOfDays > 5 && !formData?.location) || !formData?.budget || !formData?.traveller) {
      toast("Please fill all the details.");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace(/{totalDays}/g, formData?.noOfDays)
      .replace('{traveler}', formData?.traveller)
      .replace('{budget}', formData?.budget);

    console.log(FINAL_PROMPT);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = await result?.response?.text();
      console.log(responseText);
      SaveAiTrip(result?.response?.text());
    } catch (error) {
      console.error("Error in generating trip:", error);
      Toaster("An error occurred. Please try again.");
    }finally {
      setLoading(false);
    }
    
  }
  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const DocId = Date.now().toString()

  let parsedTripData;
  try {
    parsedTripData = JSON.parse(TripData); // Try parsing if it's JSON
  } catch (error) {
    parsedTripData = TripData; // Use as-is if parsing fails
  }
    await setDoc(doc(db, "AITrips", DocId), {
      userSelection: formData,
      tripData:  parsedTripData ,
      userEmail: user?.email,
      id: DocId
    })
    setLoading(false);
    navigate('/view-trip/'+DocId);
  }
  const GetuserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'application/json'
        }
      })
      .then((resp) => {
        console.log(resp);
        localStorage.setItem('user', JSON.stringify(resp.data));
        setOpenDialog(false); // Close dialog after successful login
        OnGenerateTrip(); // Proceed to generate trip after login
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  };

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us your travel preferences ⛺🌴</h2>
      <p className='mt-3 text-xl'>
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className='mt-20 flex flex-col gap-10'>

        {/* Destination Input */}
        <div>
          <h2 className='text-xl my-3 font-bold'>What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v); },
            }}
          />
        </div>

        {/* Trip Duration Input */}
        <div>
          <h2 className='text-xl my-3 font-bold'>How many days are you planning for your trip?</h2>
          <Input
            placeholder='ex. 3'
            type='number'
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>

        {/* Budget Selection */}
        <div>
          <h2 className='text-xl my-3 font-bold'>What is your budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleInputChange('budget', option.title)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-md ${formData?.budget === option.title && 'shadow-lg border-black'
                  }`}
              >
                <div className='icon text-3xl'>{option.icon}</div>
                <h2 className='text-xl font-bold'>{option.title}</h2>
                <p className='text-gray-500'>{option.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Companions Selection */}
        <div>
          <h2 className='text-xl my-3 font-bold'>Who do you plan on traveling with on your next adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelesList.map((item) => (
              <div
                key={item.id}
                onClick={() => handleInputChange('traveller', item.people)}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-md ${formData?.traveller === item.people && 'shadow-lg border-black'
                  }`}
              >
                <div className='icon text-3xl'>{item.icon}</div>
                <h2 className='text-xl font-bold'>{item.title}</h2>
                <p className='text-gray-500'>{item.desc}</p>
                <p className='font-semibold'>{item.people}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Generate Trip Button */}
      <div className='my-10 flex justify-end'>
        <button
          disabled={loading}
          onClick={OnGenerateTrip} className='p-3 bg-blue-500 text-white rounded-lg'>
          {loading ?
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' /> : 'Generate Trip'
          }
        </button>
      </div>

      {/* Dialog Component for Google Sign-In */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In With Google</DialogTitle>
            <DialogDescription>
              <img src='/logo.svg' alt='Logo' />
              <h2 className='font-bold text-lg mt-4'>Sign In With Google</h2>
              <p>Sign in to the App with Google Authentication securely!</p>
              <button onClick={login} className='w-full mt-4 bg-zinc-950 text-white flex justify-center gap-4 items-center'>
                <FcGoogle className='w-7 h-7' /> Sign in to Google
              </button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  );
}

export default CreateTrip;

