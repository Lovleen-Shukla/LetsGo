import React from 'react'

function InfoSection({trip}) {
  return (
    <div>
        <img src='/placeholder.jpg' className='h-[300px] w-full object-cover rounded'></img>
       <div className='my-5 flex flex-col gap-2'>
       <h2 className='font-bold text-2xl:'>{trip?.userSelection?.location?.label}</h2>
        </div>
        <div className='flex gap-5'>
         <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-490'>📅 {trip.userSelection?.noOfDays} Day</h2>
         <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-490'>💰{trip.userSelection?.budget} budget</h2> 
         <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-490'>🥂 No. of travellers: {trip.userSelection?.traveller}</h2>        
       </div> 
    </div>
  )
}

export default InfoSection