import React, { useState } from 'react';
import {
  Bell, ChevronDown, File, Layout, Package, Power, ShoppingCart, Tag, Users,
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
      // <div className="flex h-screen">
      //   <div className="bg-dark-100 w-60 flex flex-col justify-between p-5 shrink-0">
      //     <div className="flex flex-col items-center">
      //       <Link href="/">
      //         <a>
      //           <Logo className="fill-main-900 h-20" />
      //         </a>
      //       </Link>
      //       <div className="mt-10 w-full">
      //         {NAV_ROUTES.map((item) => (
      //           <Link href={`/${item.value}`} key={`route_${item.value}`}>
      //             <a
      //               className={`mt-3 flex justify-center h-10 px-3 text-sm font-semibold rounded-md ${pathname.includes(item.value) ? 'bg-main-900 text-dark-100' : 'hover:bg-dark-200'}`}
      //             >
      //               <div className="flex items-center w-32">
      //                 <div className="mr-3">
      //                   {item.icon}
      //                 </div>
      //                 {item.name}
      //               </div>
      //             </a>
      //           </Link>
      //         ))}
      //       </div>
      //     </div>
      //     <button
      //       onClick={handleSignOut}
      //       type="button"
      //       className="mt-3 justify-center h-10 px-3 text-sm font-semibold rounded-md hover:bg-dark-200 flex items-center"
      //     >
      //       <div className="flex items-center w-32">
      //         <div className="mr-3">
      //           <Power className="h-4 w-4" />
      //         </div>
      //         Logout
      //       </div>
      //     </button>
      //   </div>
      //   <div className="flex-1 flex flex-col h-full w-full max-w-[84vw]">
      //     <div className="py-3 flex items-stretch p-5 border-b border-dark-300">
      //       <div className="flex-1 flex items-center justify-between">
      //         <div className="text-dark-600">
      //           Your free trial expires in
      //           {' '}
      //           <span className="text-dark-900 font-semibold">12 days.</span>
      //         </div>
      //         <button type="button" className="flex items-center justify-center bg-main-900 rounded-full h-10 w-48 text-white text-sm font-semibold">
      //           Upgrade Plan
      //         </button>
      //       </div>
      //       <button onClick={() => setNotifications(false)} className="px-5 mx-5 border-l border-r border-dark-300 text-dark-500 hover:text-main-900 transition duration-100 ease-in-out">
      //         <div className="relative">
      //           <Bell className="h-6 w-6" />
      //           {notifications && (<div className="bg-main-900 border-[3px] border-white w-3 h-3 rounded-full absolute -top-[3px] right-[1px]" />
      //           )}
      //         </div>
      //       </button>
      //       <button type="button" className="flex group">
      //         <img
      //           alt="topbar"
      //           className="h-10 w-10 object-cover rounded-full mr-3"
      //           src={`${user.photoURL}`}
      //         />
      //         <div className="mr-5 text-left self-center">
      //           <h2 className="font-semibold leading-4">{user.displayName}</h2>
      //           <h4 className="text-sm text-dark-600 leading-4">CEO</h4>
      //         </div>
      //         <div className="text-dark-500 group-hover:text-main-900 transition duration-100 ease-in-out mt-0.5">
      //           <ChevronDown className="h-5 w-5" />
      //         </div>
      //       </button>
      //     </div>
      //     <div className="overflow-y-auto flex flex-col main-scrollbar">
      //       {children}
      //     </div>
      //   </div>
      // </div>
      <div className="flex h-screen w-screen">
        <div className="w-60 bg-dark-200 shrink-0 hidden md:flex p-5  flex-col justify-between">
          <div className="flex flex-col items-center">
            <Link href="/">
              <a>
                <Logo className="fill-main-900 h-20" />
              </a>
            </Link>
            <div className="mt-10 w-full">
              {NAV_ROUTES.map((item) => (
                <Link href={`/${item.value}`} key={`route_${item.value}`}>
                  <a
                    className={`mt-3 flex justify-center h-10 px-3 text-sm font-semibold rounded-md ${pathname.includes(item.value) ? 'bg-main-900 text-dark-100' : 'hover:bg-dark-200'}`}
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
            className="mt-3 justify-center h-10 px-3 text-sm font-semibold rounded-md hover:bg-dark-200 flex items-center"
          >
            <div className="flex items-center w-32">
              <div className="mr-3">
                <Power className="h-4 w-4" />
              </div>
              Logout
            </div>
          </button>
        </div>
        <div className="flex-1 border-b border-dark-300 flex flex-col shrink overflow-hidden">
          <div className="h-16 shrink-0 flex items-center px-5">
            <div className="flex-1 flex items-center justify-between">
              <div className="text-dark-600 hidden lg:block">
                Your free trial expires in
                {' '}
                <span className="text-dark-900 font-semibold">12 days.</span>
              </div>
              <button type="button" className="flex items-center justify-center bg-main-900 rounded-full h-10 px-10 text-white text-sm font-semibold">
                Upgrade Plan
              </button>
            </div>
            <button onClick={() => setNotifications(false)} className="px-5 mx-5 border-l border-r border-dark-300 text-dark-500 hover:text-main-900 transition duration-100 ease-in-out">
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
                src={`${user.photoURL}`}
              />
              <div className="mr-5 text-left self-center">
                <h2 className="font-semibold leading-4">{user.displayName}</h2>
                <h4 className="text-sm text-dark-600 leading-4">CEO</h4>
              </div>
              <div className="text-dark-500 group-hover:text-main-900 transition duration-100 ease-in-out mt-0.5">
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
