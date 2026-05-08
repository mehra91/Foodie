import React, { useContext, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { StoreContext } from '../Context/StoreContext';
import axios from 'axios'

const SignIN = ({ setIsSignIn }) => {


  const {url,setToken,login} = useContext(StoreContext);

  const [currentState, setCurrentState] = useState('SignIn');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: ''
  })

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData(data => (
      { ...data, [name]: value }
    )
    )
  }

  const onLogin = async (e) =>{
     e.preventDefault();
     let newUrl = url;
     if(currentState==='SignIn'){
      newUrl += '/api/user/login'
     }else{
      newUrl += '/api/user/register'
     }
     const response = await axios.post(newUrl,data);
     if (response.data.success) {
      setToken(response.data.token);
        await login(response.data.token)
      localStorage.setItem("token",response.data.token);
      setIsSignIn(false)

     }else{
      alert(response.data.message);
     }
  }

  

  return (
    <div className='fixed inset-0 bg-black/90 text-black min-h-full w-full z-10  flex items-center justify-center'>
      <div className='bg-white h-70 rounded flex flex-col items-center   w-80'>

        <div className='flex items-center  justify-around   h-12 w-full '>
          <h2 className=' text-xl text-orange-500 font-bold tracking-wider
            w-2xs h-full flex items-center justify-center'>
            {currentState}
          </h2>
          <h2 className='text-xl text-black font-medium '>
            <RxCross2 className='cursor-pointer text-orange-500 '
              onClick={() => setIsSignIn(false)} />
          </h2>
        </div>
        <form onSubmit={onLogin}
        className='flex flex-col    h-full w-full gap-2 items-center '>
          {currentState === 'SignIn'
            ?
            <></>
            :
            <input
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              type='text '
              placeholder='name or username'
              required
              className='border rounded h-8 w-3xs capitalize text-xs tracking-wide font-medium text-center' />
          }
          <input
            type="text"
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            placeholder=' Enter your  Email '
            required
            className='border rounded h-8 w-3xs   text-xs text-center tracking-wide font-medium ' />
          <input
            type="password"
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            placeholder='Enter password'
            required
            className='border rounded h-8 w-3xs    text-xs text-center tracking-wide font-medium ' />
          <button
          type='submit'
            className='cursor-pointer border h-8 w-3xs rounded text-sm font-medium bg-orange-500 '>
            {currentState === 'Signup'
              ? 'Create account'
              : 'Login'
            }
          </button>
          <div className='flex items-center justify-center gap-x-2 h-auto w-3xs'>
            <input type="checkbox" required className='cursor-pointer' />
            <p className='text-xs opacity-80 text-pretty  font-medium '>
              By continuing, i agree the terms of use & privacy policy .
            </p>
          </div>

          {
            currentState === 'SignUp'
              ? <p className='text-xs font-medium opacity-60  '>
                Already have an account ? <span onClick={() => setCurrentState("SignIn")} className='text-orange-500 opacity-100 font-bold cursor-pointer'>SignIn</span>
              </p>

              : <p className='text-xs font-medium opacity-60  '>
                Create a new account ? <span onClick={() => setCurrentState("SignUp")} className='text-orange-500 opacity-100 font-bold cursor-pointer'>Click here</span>
              </p>
          }

        </form>
      </div>
    </div>
  )
}

export default SignIN