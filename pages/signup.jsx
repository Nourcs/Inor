import React, { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { auth } from '../utils/firebase';
import Logo from '../public/logo';

const NAVIGATION = [{ name: 'Login', value: 'login' }, { name: 'Sign up', value: 'signup' }];

function Login() {
  const { pathname } = useRouter();
  const [user, setUser] = useState(null);
  const provider = new GoogleAuthProvider();

  const onAuthClick = async () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const { user } = result;
        setUser(user);
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const { email } = error.customData;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  useEffect(() => { console.log('Asba', user); }, [user]);
  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-dark-100 p-5">1</div>
      <div className="flex-1 p-5 flex items-center justify-center">
        <div className="bg-dark-300 p-5 flex flex-col">
          <Logo className="fill-main-900 h-20" />
          <div className="flex mt-5">
            {NAVIGATION.map((item) => (
              <Link href={`${item.value}`}>
                <button type="button" className={`mr-5 text-lg font-black ${pathname.includes(item.value) ? 'text-main-900' : 'text-dark-600 hover:text-dark-900'}`}>
                  {item.name}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/* <button type="button" onClick={onAuthClick}>
        Sign in with Google
      </button> */}
    </div>
  );
}

export default Login;
