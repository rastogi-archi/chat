import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }
    return (
        <div className='bg-blue-100 h-screen flex items-center'>
            <form className='w-64 mx-auto'>
                <input type="text" placeholder='username' className='w-full block outline-none p-2 mb-2 rounded-sm' />
                <div className='flex'>
                    <input type={passwordVisible ? 'text' : 'password'} placeholder='password' className='w-full block outline-none p-2 mb-2 relative rounded-sm' />
                    <button
                        type='button'
                        onClick={togglePasswordVisibility}
                        className='absolute bg-transparent border-none cursor-pointer right-[650px] top-[325px]'
                    >
                        {passwordVisible ? (<FaEye />) : (<FaEyeSlash />)}
                    </button>
                </div>
                <button className='block w-full text-white bg-blue-500 p-2 rounded-sm'>Login</button>
                <p className='text-sm text-center mt-2'>Don't have an account?<span className='cursor-pointer ml-1'>Register</span></p>
            </form>
        </div>
    )
}

export default Register
