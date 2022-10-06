/* eslint-disable react/prop-types */
/* eslint-disable no-console */

import React, { useState } from 'react';
import {
  Bell, ChevronDown, File, Layout, Menu, Package, Power, ShoppingCart, Tag, Users,
} from 'react-feather';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import Logo from '../../public/logo';
import { auth } from '../../utils/firebase';
import { useAppContext } from '../../context/state';
import Spinner from '../../public/spinner';

const NAV_ROUTES = [
  { value: 'dashboard', name: 'Dashboard', icon: <Layout className="h-4 w-4" /> },
  { value: 'inventory', name: 'Inventory', icon: <Package className="h-4 w-4" /> },
  { value: 'sales', name: 'Sales', icon: <Tag className="h-4 w-4" /> },
  { value: 'purchases', name: 'Purchases', icon: <ShoppingCart className="h-4 w-4" /> },
  { value: 'invoices', name: 'Invoices', icon: <File className="h-4 w-4" /> },
  { value: 'staff', name: 'Staff', icon: <Users className="h-4 w-4" /> },
];

function Main({ children }) {
  const router = useRouter();
  const {
    loading, user, setUser, setLoading,
  } = useAppContext();

  const { pathname } = useRouter();
  const [notifications, setNotifications] = useState(true);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      setLoading(true);
      setUser(null);
    }).catch((error) => {
      // An error happened.
      console.error(error);
    });
  };

  if (!loading && !user) {
    router.push('/login');
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  if (!loading && user) {
    return (
      <div className="flex h-screen w-screen">
        <div className="w-60 bg-dark-100 shrink-0 hidden lg:flex p-5 flex-col justify-between">
          <div className="flex flex-col items-center">
            <Link href="/" passHref>
              <a href="#1">
                <Logo className="fill-main-900 h-20" />
              </a>
            </Link>
            <div className="mt-10 w-full">
              {NAV_ROUTES.map((item) => (
                <Link href={`/${item.value}`} key={`route_${item.value}`}>
                  <a
                    href="#1"
                    className={`mt-3 flex justify-center h-10 px-3 text-sm font-semibold rounded-md transition duration-150 ease-out ${pathname.includes(item.value) ? 'bg-main-900 text-dark-100' : 'hover:bg-dark-200'}`}
                  >
                    <div className="flex items-center w-32">
                      <div className="mr-3">
                        {item.icon}
                      </div>
                      {item.name}
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <button
            onClick={handleSignOut}
            type="button"
            className="mt-3 justify-center h-10 px-3 text-sm font-semibold rounded-md duration-150 ease-out transition hover:bg-dark-200 flex items-center"
          >
            <div className="flex items-center w-32">
              <div className="mr-3">
                <Power className="h-4 w-4" />
              </div>
              Logout
            </div>
          </button>
        </div>
        <div className="flex-1 flex flex-col shrink overflow-hidden">
          <div className="py-5 shrink-0 flex sm:hidden items-stretch justify-between px-5 border-b border-dark-300 ">
            <Link href="/" passHref>
              <a href="#1" className="text-main-900 font-semibold text-lg">
                Inor
              </a>
            </Link>
            <button type="button" className="text-dark-400 hover:text-main-900 transition duration-150 ease-in-out">
              <Menu className="h-5 w-5" />
            </button>
          </div>
          <div className="py-5 shrink-0 hidden sm:flex items-stretch px-5 border-b border-dark-300 ">
            <div className="flex-1 items-center justify-end md:justify-between flex">
              <div className="text-dark-500 hidden md:block">
                Your free trial expires in
                {' '}
                <span className="text-dark-900 font-semibold">12 days.</span>
              </div>
              <button
                type="button"
                className="flex items-center justify-center bg-main-900 rounded-full h-10 w-full md:w-auto md:px-5 lg:px-10 text-white text-sm font-semibold hover:bg-dark-900 transition duration-150 ease-in-out"
              >
                Upgrade
                <span className="ml-1 hidden sm:block">
                  Plan
                </span>
              </button>
            </div>
            <button type="button" onClick={() => setNotifications(false)} className="px-5 mx-5 border-l border-r border-dark-300 text-dark-400 hover:text-main-900 transition duration-100 ease-in-out">
              <div className="relative">
                <Bell className="h-6 w-6" />
                {notifications && (<div className="bg-main-900 border-[3px] border-white w-3 h-3 rounded-full absolute -top-[3px] right-[1px]" />
                )}
              </div>
            </button>
            <button type="button" className="flex group">
              <img
                alt="topbar"
                className="h-10 w-10 object-cover rounded-full mr-3"
                src={`${user?.photoURL || ''}`}
                onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/1144/1144709.png'}
              />
              <div className="mr-5 text-left self-center">
                <h3 className="font-semibold leading-4">{user?.displayName || 'User'}</h3>
                <h4 className="text-sm text-dark-500 leading-4">CEO</h4>
              </div>
              <div className="text-dark-400 group-hover:text-main-900 transition duration-100 ease-in-out mt-0.5">
                <ChevronDown className="h-5 w-5" />
              </div>
            </button>
          </div>
          <div className="h-full overflow-y-auto max-w-full flex flex-col">
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
