import React from 'react'
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { setToken, setUser } from '../slices/authSlice';
const Dashboard = () => {
    const { user } = useSelector((state) => state.auth)

    const { firstName, lastName, phoneNumber, email, photo, pastExperience, skillSet, 
        educationalQualification } = user;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = (navigate) => {
        return (dispatch) => {
            dispatch(setToken(null))
            dispatch(setUser(null))

            localStorage.removeItem("token")
            localStorage.removeItem("user")

            toast.success("Logged Out")

            navigate("/")
        }
    }

  return (
    <div className='flex flex-col ml-10 my-auto gap-6'>
        <p className='text-center font-extrabold text-4xl '>DASHBOARD</p>
        <div className='flex  gap-4 items-center'>
            <h2>
                Profile Photo :
            </h2>
            <img src={photo}
                className='w-[50px] aspect-square rounded-full'
            />
        </div>

        <div className='flex  gap-4' >
            <h2>
                Name :
                
            </h2>
            <p>{`${firstName} ${lastName}`}</p>
        </div>

        <div className='flex  gap-4' >
            <h2>
                Phone Number :
                
            </h2>
            <p>{phoneNumber}</p>
        </div>

        <div className='flex  gap-4' >
            <h2>
                Email :
                
            </h2>
            <p>{email}</p>
        </div>

        <div className='flex  gap-4' >
            <h2>
                Past Experience :
                
            </h2>
            <p>{`${pastExperience ? pastExperience :
                     " (You do not specified your past experience yet)"  }`}</p>
        </div>

        <div className='flex  gap-4' >
            <h2>
                Skill Set :
                
            </h2>
            <p>{`${skillSet ? skillSet :
                     " (You do not specified your skill set yet)"  }`}</p>
        </div>

        <div className='flex  gap-4' >
            <h2>
                Educational Qualification :
                
            </h2>
            <p>{`${educationalQualification ? educationalQualification :
                     " (You do not specified your Educational Qualification yet)"  }`}</p>
        </div>

        <Link to={"/updateDetails"}>
            <button className='px-4 py-2 border-2 border-black'>
                Edit Profile
            </button>
        </Link>

        <div>
            <button className='px-4 py-2 border-2 border-black'
                onClick={() => {dispatch(logout(navigate)) } }>
                Logout
            </button>
        </div>



    </div>
  )
}

export default Dashboard