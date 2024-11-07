  'use client'
  import React, { useState } from 'react'

  const Login = () => {
    const [currentState, setCurrentState] = useState('Login');
    
    return (
      
      <div className="absolute w-[500px] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <form className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
          <div className='inline-flex items-center gap-2 mb-2 mt-10'>
            <p className='prata-regular text-3xl'>{currentState}</p>
            <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
          </div>
          {currentState === 'Login' ? '' : (
            <input 
              value="" 
              type="text" 
              className='w-full px-3 py-2 border border-gray-800' 
              placeholder='Name' 
              required 
            />
          )}
          <input
            className='w-full px-3 py-2 border outline-none border-gray-800'
            placeholder='Email'
            required
          />
          <input
            type="password"
            className='w-full px-3 py-2 border outline-none border-gray-800'
            placeholder='Password'
            required
          />
          <div className='w-full flex justify-between text-sm mt-[-8px]'>
            <p></p>
            {
              currentState === 'Login' 
              ? <p className='cursor-pointer' onClick={() => setCurrentState('Sign Up')}>Register</p> 
              : <p className='cursor-pointer' onClick={() => setCurrentState('Login')}>Login here</p>
            }
          </div>
          <button type='submit' className='bg-red-500 text-white px-4 py-2'>
            {currentState === 'Sign Up' ? 'Sign Up' : 'Login'} 
          </button>
        </form>
      </div>
    );
  };

  export default Login;
