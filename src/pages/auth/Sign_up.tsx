import React, { useState } from 'react';

const Sign_up = () => {

  const [email, setEmail] = useState('');
  const[password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  
  

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

 
  const iconOpen = <svg className="h-8 w-8 text-sky-700"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />  <circle cx="12" cy="12" r="3" /></svg>

  const iconClose = <svg className="h-8 w-8 text-sky-700"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"
  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 
  0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 
  0 1 1-4.24-4.24" />  <line x1="1" y1="1" x2="23" y2="23" /></svg>

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-opacity-50 ">

        <div className='flex h-full'>

            <div className="w-1/2 flex justify-center items-center bg-gray-800">
                
                <div className="bg-gray p-4  mx-auto my-8 text-center">
                    <p className=" text-white text-xl font-bold text-xl pb-5">¡¡De nada sirve hacer ejercicio sin tener un orden!!</p>
                    <p className="text-white text-lg">Nuestra app está diseñada para hacer tus horas de ejercicio algo más controlado</p>
                    <div className='flex justify-center pt-10'>
                        <img src="../src/logo.png" alt="Logo"></img>
                    </div>
                </div>    
            </div>

            <div className='w-1/2 flex justify-center items-center bg-sky-600'>
                <div> 
                    <div className='pb-10'>
                    <label className='text-white pb-12 font-bold'>
                        ¡¡Registrarse es gratis y toma poco tiempo!!
                    </label>
                    </div>
                <form className="bg-white shadow-md flex flex-col items-center rounded-xl px-8 pt-10 pb-8 mb-1">
                    <div className='pb-2'>
                        <label className=' font-bold'>
                            Correo electrónico
                        </label>
                    </div>  
                    <div className='pb-6'>
                        <input className=' text-2xl bg-white border-b border-sky-300 focus:border-sky-700 focus:outline-none' 
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                        </input>
                    </div>
                    <div className='pb-2'>
                        <label className=' font-bold'>
                            Contraseña
                        </label>
                    </div>  
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className=" text-2xl bg-white border-b border-sky-300 focus:border-sky-700 focus:outline-none"
                        />
                      <span
                        className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer"
                        onClick={toggleShowPassword}
                        style={{ zIndex: 1 }}
                      >
                        {showPassword ? iconOpen : iconClose}
                      </span>
                      
                    </div>
                    <div className='pt-8'>
                        
                        <button  className ='transition-transform transform hover:scale-110 text-white bg-sky-500 hover:bg-blue-800 font-bold py-3 px-5 rounded-lg'>
                            registrarse
                        </button>
                        
                    </div>
                </form>
                <p className='text-base text-white'>¿Ya tienes una cuenta? prueba  &nbsp;     
                    <a href='/login' className='inline-block text-white hover:text-gray-300 transition-transform transform hover:scale-110'> iniciar sesión</a></p>
                </div>    
            </div>
        </div>
    </div>
  )
}

export default Sign_up