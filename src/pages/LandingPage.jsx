import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const LandingPage = () => {
    return (
        <div className='flex justify-center items-center my-auto'>
            <div className='flex justify-between w-[15%] h-[50%]  '>
                <Link to={"/login"}>
                    <button className='border-4 border-black px-5 py-2'
                    >
                        Login
                    </button>
                </Link>

                <Link to={"/signup"}>
                    <button className='border-4 border-black px-5 py-2'
                    >
                        Sign Up
                    </button>

                </Link>

            </div>
    
        </div>
      )
}

export default LandingPage