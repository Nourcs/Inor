import '../styles/globals.css';
import '../styles/index.css';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../utils/firebase';
import AppContext from '../context/state';

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (result) => {
      if (result) {
        const {
          displayName, email, uid, photoURL, phoneNumber,
        } = result;
        setUser({
          displayName, email, uid, photoURL, phoneNumber,
        });
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } else {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    });
  }, []);

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <AppContext.Provider value={{
      user, setUser, loading, setLoading,
    }}
    >
      {getLayout(<Component {...pageProps} />)}
    </AppContext.Provider>
  );
}

export default MyApp;
