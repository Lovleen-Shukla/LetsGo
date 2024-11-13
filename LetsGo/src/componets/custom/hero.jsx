import React from 'react'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
      <h1 className='font-extrabold text-[60px] text-center mt-8 text-black'>
        <span>Discover Your Next Adventure with AI: </span>
        Personalized itineraries at Your Fingertips</h1>
        <p className='text-xl'>Your personal trip planner and travel curator, creating custom iteineraries taiored to your interests and budget.</p>
        
        <Link to={'/create-trip'}>
        <button>Get Started, it's Free!</button>
        </Link>
    </div>
  )
}

export default Hero