import { useState, useContext } from "react";
import { RxCross2 } from "react-icons/rx";
import { StoreContext } from '../Context/StoreContext';
import axios from 'axios';

const SignIN = ({ setIsSignIn }) => {
  const { url, setToken, login } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState('SignIn');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ name: '', email: '', password: '' });

  const isSignUp = currentState === 'SignUp';
  const firstName = data.name.trim().split(' ')[0];

  const onChangeHandler = (e) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = isSignUp ? '/api/user/register' : '/api/user/login';
    const response = await axios.post(url + endpoint, data);
    setLoading(false);
    if (response.data.success) {
      setToken(response.data.token);
      await login(response.data.token);
      localStorage.setItem("token", response.data.token);
      setIsSignIn(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full sm:w-100 bg-white rounded-3xl overflow-hidden shadow-2xl">

        {/* Top */}
        <div className="relative bg-linear-to-br from-orange-500 to-amber-400 px-4 sm:px-7 pt-6 sm:pt-8 pb-10 sm:pb-14 overflow-hidden">
          <div className="absolute w-44 h-44 rounded-full bg-white/10 -top-14 -right-10"/>
          <button onClick={() => setIsSignIn(false)}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center text-white transition cursor-pointer border-none">
            <RxCross2 size={14}/>
          </button>
          <h1 className="font-['Playfair_Display'] text-xl sm:text-[30px] font-extrabold text-white leading-[1.15] mb-1.5">
            {isSignUp ? <>Let's get<br/>you <em className="italic">started!</em></>
                      : <>Good to see<br/>you <em className="italic">again!</em></>}
          </h1>
          <p className="text-white/80 text-xs sm:text-[13px]">
            {isSignUp ? 'Join thousands ordering with Foodie'
                      : 'Sign in and order your favourite food'}
          </p>
        </div>

        {/* Body */}
        <div className="px-4 sm:px-7 pt-1 pb-6 sm:pb-7 -mt-5 relative">

          {/* Tabs */}
          <div className="flex gap-1 bg-gray-100 rounded-2xl p-1 mb-5">
            {[['SignIn','Sign In'],['SignUp','Create Account']].map(([val, label]) => (
              <button key={val} onClick={() => setCurrentState(val)}
                className={`flex-1 py-2 sm:py-2.5 rounded-xl text-xs sm:text-[13px] font-semibold transition cursor-pointer border-none ${
                  currentState === val
                    ? 'bg-white text-orange-500 shadow-md'
                    : 'text-gray-400 bg-transparent'
                }`}>
                {label}
              </button>
            ))}
          </div>

          {/* Friendly greeting */}
          {isSignUp && data.name.length > 1 && (
            <div className="mb-4 px-3 py-2 sm:py-2.5 bg-orange-50 border-l-[3px] border-orange-500 rounded-xl text-xs sm:text-[12px] text-orange-600 font-medium">
              Hey {firstName}! Great to have you here. Let's set up your account.
            </div>
          )}

          <form onSubmit={onLogin} className="flex flex-col gap-3 sm:gap-3.5">

            {isSignUp && (
              <div>
                <label className="block text-xs sm:text-[11px] font-semibold text-black uppercase tracking-wider mb-1.5">
                  Your Name
                </label>
                <input name="name" type="text" onChange={onChangeHandler} value={data.name}
                  placeholder="e.g. Priyanshu" required
                  className="w-full h-10 sm:h-11.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-xs sm:text-[13.5px] text-gray-800 placeholder-gray-300 outline-none focus:border-orange-400 focus:bg-white focus:ring-[3px] focus:ring-orange-500/8 transition"/>
              </div>
            )}

            <div>
              <label className="block text-xs sm:text-[11px] font-semibold text-black uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <input name="email" type="email" onChange={onChangeHandler} value={data.email}
                placeholder="you@example.com" required
                className="w-full h-10 sm:h-11.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-xs sm:text-[13.5px] text-gray-800 placeholder-gray-300 outline-none focus:border-orange-400 focus:bg-white focus:ring-[3px] focus:ring-orange-500/8 transition"/>
            </div>

            <div>
              <label className="block text-xs sm:text-[11px] font-semibold text-black uppercase tracking-wider mb-1.5">
                Password
              </label>
              <input name="password" type="password" onChange={onChangeHandler} value={data.password}
                placeholder="Min. 8 characters" required
                className="w-full h-10 sm:h-11.5 px-4 rounded-xl border border-gray-200 bg-gray-50 text-xs sm:text-[13.5px] text-gray-800 placeholder-gray-300 outline-none focus:border-orange-400 focus:bg-white focus:ring-[3px] focus:ring-orange-500/8 transition"/>
            </div>

            <div className="flex items-start gap-2">
              <input type="checkbox" required className="mt-0.5 accent-orange-500 cursor-pointer w-3.5 h-3.5 shrink-0"/>
              <p className="text-xs sm:text-[11.5px] text-gray-400 leading-relaxed">
                By continuing I agree to the{' '}
                <span className="text-orange-500 font-semibold cursor-pointer">Terms of Use</span>{' '}
                & <span className="text-orange-500 font-semibold cursor-pointer">Privacy Policy</span>
              </p>
            </div>

            <button type="submit" disabled={loading}
              className="w-full h-11 sm:h-12 rounded-xl bg-linear-to-r from-orange-500 to-amber-400 text-white font-bold text-xs sm:text-sm tracking-wide shadow-lg shadow-orange-200 hover:-translate-y-0.5 hover:shadow-orange-300 active:translate-y-0 transition-all cursor-pointer border-none disabled:opacity-75">
              {loading ? (isSignUp ? 'Setting up...' : 'Signing in...') 
                       : (isSignUp ? 'Create My Account' : 'Sign In')}
            </button>

            <p className="text-center text-xs sm:text-[12.5px] text-gray-400">
              {isSignUp ? 'Already have an account? ' : 'New here? '}
              <span onClick={() => setCurrentState(isSignUp ? 'SignIn' : 'SignUp')}
                className="text-orange-500 font-bold cursor-pointer hover:underline">
                {isSignUp ? 'Sign in' : 'Create a free account'}
              </span>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIN;