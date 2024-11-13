import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { doc, getDoc, setDoc } from "firebase/firestore"; // Adjust path if needed
import { db } from '@/service/fireBaseConfig';
import { toast } from 'sonner';
import InfoSection from '../compoents/infoSection';

function Viewtrip() {
  const { tripId } = useParams();
  const [trip,setTrip]=useState([]);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId])

  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No such document Found.");
      toast('No trip found!');
    }
  }
  return(
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/*INFORMATION SECTION */} 
      <InfoSection trip={trip}/>
      {/*RECOMMENDED HOTELS */} 
      {/* DAILY PLANS*/} 
      {/* FOOTER*/} 
    </div>
   
  )
}

export default Viewtrip