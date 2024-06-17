import React, { useContext, useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from 'axios';
import { UserContext } from '../context/UserContext';

const RegisterAndLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isLoggedInOrRegister, setIsLoggedInOrRegister] = useState('register');

    const { setUsername: setLoggedInUsername, setId } = useContext(UserContext);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    }
    async function handleSubmit(e) {
        e.preventDefault();
        const url = isLoggedInOrRegister === 'register'? 'register': 'login';
        const { data } = await axios.post(url, { username, password });
        setLoggedInUsername(username);
        setId(data.id);
    }
    return (
        <div className='bg-blue-100 h-screen flex items-center'>
            <form className='w-64 mx-auto' onSubmit={handleSubmit}>
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
                <button className='block w-full text-white bg-blue-500 p-2 rounded-sm'>
                    {isLoggedInOrRegister === 'register' ? 'Register' : 'Login'}
                </button>
                <div className='text-sm text-center mt-2'>
                    {isLoggedInOrRegister === 'register' && (
                        <div>
                            Already have an account?
                            <button
                                onClick={() => setIsLoggedInOrRegister('login')}
                                className='cursor-pointer ml-1'>Login
                            </button>
                        </div>
                    )}
                    {isLoggedInOrRegister === 'login' && (
                        <div>
                            Don't have an account?
                            <button
                                onClick={() => setIsLoggedInOrRegister('register')}
                                className='cursor-pointer ml-1'>Register
                            </button>
                        </div>
                    )}
                </div>
            </form>
        </div>
    )
}

export default RegisterAndLogin
