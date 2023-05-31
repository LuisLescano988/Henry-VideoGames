import React from 'react';
import { Link } from 'react-router-dom';
import '../LandingPage/index.css'

export default function Landing() {
  return (
    <div>
        <h1 className='landing'>Check this Gaming info App</h1>
      <Link to='/main' className='landing_link'>
        <h2 className='startbtn'>PRESS START!</h2>
      </Link>
    </div>
  )
}

