import React from 'react';
import { useRouter } from 'next/router';
import { useAppContext } from '../context/state';
import Spinner from '../public/spinner';

function Index() {
  const router = useRouter();

  const {
    user, loading,
  } = useAppContext();

  if (!loading && user) { router.push('/dashboard'); }
  if (!loading && !user) { router.push('/login'); }

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  return null;
}

export default Index;
