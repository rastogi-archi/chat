import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }
    async function register(e){
        e.preventDefault();
        await axios.post('/register',{username,password});
    }
    return (
        <div className='bg-blue-100 h-screen flex items-center'>
            <form className='w-64 mx-auto' onSubmit={register}>
                <input
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    type="text"
                    placeholder='username'
                    className='w-full block outline-none p-2 mb-2 rounded-sm' />
                <div className='relative w-full mb-2'>
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type={passwordVisible ? 'text' : 'password'}
                        placeholder='password'
                        className='w-full block outline-none p-2 mb-2 relative rounded-sm' />
                    <button
                        type='button'
                        onClick={togglePasswordVisibility}
                        className='absolute bg-transparent border-none cursor-pointer right-2 top-3'
                    >
                        {passwordVisible ? (<FaEye />) : (<FaEyeSlash />)}
                    </button>
                </div>
                <button className='block w-full text-white bg-blue-500 p-2 rounded-sm'>Register</button>
                {/* <p className='text-sm text-center mt-2'>Don't have an account?<span className='cursor-pointer ml-1'>Register</span></p> */}
            </form>
        </div>
    )
}

export default Register
