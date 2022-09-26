import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/router';
import { auth } from '../utils/firebase';
import Logo from '../public/logo';
import Google from '../public/google';
import { useAppContext } from '../context/state';
import Spinner from '../public/spinner';

function Login() {
  const router = useRouter();
  const [background, setBackground] = useState(Math.floor(Math.random() * 2) + 1);
  const {
    setUser, user, loading, setLoading,
  } = useAppContext();
  const provider = new GoogleAuthProvider();

  const onAuthClick = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const {
          displayName, email, uid, photoURL, phoneNumber,
        } = result.user;
        setLoading(true);
        setUser({
          displayName, email, uid, photoURL, phoneNumber,
        });
        // ...
      }).catch((error) => {
        // Handle Errors here.
        console.error('error', error);
      });
  };

  if (!loading && user) { router.push('/dashboard'); }

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }
  if (!loading && !user) {
    return (
      <div
        className="h-screen w-screen flex flex-col lg:flex-row"
        style={{
          backgroundImage: `url("/backgrounds/bg_${background}.svg")`,
          backgroundAttachment: 'fixed',
          backgroundSize: 'cover',
        }}
      >
        <div className="lg:w-1/2 p-5 lg:p-10 flex flex-col">
          <Logo className="fill-white h-20 self-center lg:self-start" />
          <div className="hidden lg:flex items-center text-white flex-1">
            <div className="max-w-md">
              <h1 className="text-3xl font-black">
                Lorem ipsum dolor sit
                amet, consectetur adipiscing elit.
              </h1>
              <p className="text-lg mt-5">
                Lorem ipsum dolor sit amet, consectetur
                adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua.
              </p>
              <button type="button" className="mt-5 h-10 bg-white font-semibold text-main-900 flex items-center justify-center rounded-full px-10 text-sm">
                Request Demo
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 w-full lg:w-1/2 flex items-start lg:items-center justify-center p-5 lg:p-10 relative">
          <div className="bg-white px-5 md:px-10 py-16 shadow-xl rounded-md w-full max-w-md">
            <div>
              <span className="block text-sm font-semibold">Email</span>
              <input
                type="email"
                className="h-10 w-full focus:outline-none border-2 rounded-md px-3 border-dark-300 mt-1 placeholder-dark-400"
                placeholder="info@inor.io"
              />
            </div>
            <div className="mt-3">
              <span className="block text-sm font-semibold">Password</span>
              <input
                type="password"
                className="h-10 w-full focus:outline-none border-2 rounded-md px-3 border-dark-300 mt-1 placeholder-dark-400"
                placeholder="&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;&#8226;"
              />
            </div>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center group">
                <button
                  type="button"
                  className="border-dark-300 h-5 w-5 rounded-md border-2 mr-2 group-hover:border-main-900 transition duration-100 ease-in-out"
                />
                <span className="text-sm text-dark-400 group-hover:text-dark-900 transition duration-100 ease-in-out">Remember Me</span>
              </div>
              <button type="button" className="text-sm font-semibold text-dark-400 hover:text-main-900 transition duration-100 ease-in-out">Forgot Password?</button>
            </div>
            <button type="button" className="mt-6 bg-main-900 text-sm font-semibold text-white w-full h-10 flex items-center justify-center rounded-md">Sign in</button>
            <button
              onClick={onAuthClick}
              type="button"
              className="mt-3 border-2 border-main-900 text-sm font-semibold text-main-900 w-full h-10 flex items-center justify-center rounded-md transition duration-100 ease-in-out hover:bg-main-900 hover:text-white group"
            >
              <Google className="h-4 w-4 fill-main-900 mr-5 group-hover:fill-white transition duration-100 ease-in-out" />
              Sign in with Google
            </button>
          </div>
          <div className="absolute bottom-5 text-xs text-white lg:text-dark-900">
            <span className="hover:underline cursor-pointer lg:hover:text-main-900">
              Terms of use
            </span>
            {' '}
            &
            {' '}
            <span className="hover:underline cursor-pointer lg:hover:text-main-900">
              Privacy Policy
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
