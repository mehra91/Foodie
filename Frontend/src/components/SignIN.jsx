import React, { useState } from 'react'
import { RxCross2 } from "react-icons/rx";

const SignIN = ({ setIsSignIn }) => {
  const [currentState, setCurrentState] = useState('Login');
  return (
    <div className='fixed inset-0 bg-black/50 min-h-full w-full z-10'>
      <div className='flex  '>
        <h2>
          {currentState}
        </h2>
        <h2>
          <RxCross2 onClick={() => setIsSignIn(false)} />
        </h2>
      </div>
      <form>
        {currentState === 'Signup'
          ?
          <input type='text ' placeholder='name or username' required />
          :
          <></>
        }
        <input type="text" placeholder='Email id' />
        <input type="password" placeholder='Enter password' />
        <button>
          {currentState === 'Signup'
            ? 'SignUP'
            : 'Login'
          }
        </button>

      </form>
    </div>
  )
}

export default SignIN