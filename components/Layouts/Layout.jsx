import React from 'react';
import {
  Bell, ChevronRight, File, Layout, Package, ShoppingCart, Users,
} from 'react-feather';
import { useRouter } from 'next/router';
import Link from 'next/link';

const NAV_ROUTES = [
  { value: 'dashboard', name: 'Dashboard', icon: <Layout className="h-5 w-5" /> },
  { value: 'inventory', name: 'Inventory', icon: <Package className="h-5 w-5" /> },
  { value: 'orders', name: 'Orders', icon: <ShoppingCart className="h-5 w-5" /> },
  { value: 'invoice', name: 'Invoice', icon: <File className="h-5 w-5" /> },
  { value: 'staff', name: 'Staff', icon: <Users className="h-5 w-5" /> },
];

function Main({ children }) {
  const { pathname } = useRouter();

  return (
    <div className="flex h-screen items-start bg-dark-100 overflow-y-hidden">
      <div className="w-52 h-full bg-white flex flex-col items-center pt-5">
        <Link href="/dashboard">
          <a>
            <img
              alt="topbar"
              className="w-16 stroke-white	"
              src="/logo.svg"
            />
          </a>
        </Link>
        <div className="flex-1 pb-5 flex items-center">
          <div>
            {NAV_ROUTES.map((item) => (
              <Link href={`/${item.value}`}>
                <a className={`flex items-center justify-start mt-5 transition duration-100 ease-out ${pathname.includes(item.value) ? 'text-orange-900' : 'text-dark-500 hover:text-dark-900'}`}>
                  <div className="mr-3">
                    {item.icon}
                  </div>
                  <span className="font-bold">{item.name}</span>
                </a>
              </Link>
            ))}

          </div>
        </div>
        <div className="flex items-center justify-between w-full px-3 border-t border-dark-400 h-16">
          <div className="flex items-center leading-5">
            <img
              alt="topbar"
              className="h-10 w-10 object-cover rounded-full mr-3"
              src="https://images.unsplash.com/photo-1634250420331-68d96d14ec5b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            />
            <div className="leading-4">
              <h3 className="text-sm text-dark-600">
                Business
              </h3>
              <h2 className="font-extrabold">
                Starbucks
              </h2>
            </div>
          </div>
          <button type="button">
            <div>
              <ChevronRight className="h-5 w-5" />
            </div>
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col h-full">
        <div className="bg-dark-100 border-b border-dark-400 flex items-center p-5">
          <div className="flex-1 pr-5 flex items-center justify-between">
            <div>
              Your free trial expires in
              {' '}
              <span className=" font-extrabold">12 days</span>
            </div>
            <button type="button" className="font-bold text-sm bg-orange-900 rounded-full text-dark-100 px-8 h-10">
              Upgrade Membership
            </button>
          </div>
          <div className="border-x border-dark-400 flex items-center justify-center">
            <button className="flex items-center justify-center h-10 w-16" type="button">
              <div>
                <Bell className="h-5 w-5 text-dark-600" />
              </div>
            </button>
          </div>
          <div className="pl-5 flex items-center leading-5">
            <img
              alt="topbar"
              className="h-10 w-10 object-cover rounded-full mr-3"
              src="https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1944&q=80"
            />
            <div>
              <h2 className=" font-extrabold">
                Nour Cherif Essoussi
              </h2>
              <h3 className="text-sm text-dark-600">
                CEO
              </h3>
            </div>
          </div>
        </div>
        <div className="overflow-y-auto flex flex-col h-screen">
          {children}
        </div>
      </div>

    </div>
  );
}

export default Main;
