import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Layers, Home, Package, Truck,
} from 'react-feather';

const NAVIGATION = [
  { label: 'Products', value: 'products', icon: <Package className="h-5 w-5" /> },
  { label: 'Categories', value: 'categories', icon: <Layers className="h-5 w-5" /> },
  { label: 'Suppliers', value: 'suppliers', icon: <Truck className="h-5 w-5" /> },
  { label: 'Warehouses', value: 'warehouses', icon: <Home className="h-5 w-5" /> },
];

function InventoryLayout() {
  const { pathname } = useRouter();
  return (
    <div className="flex items-center w-full sm:w-auto">
      <div className="sm:hidden w-5 h-7 absolute bg-gradient-to-r from-white bg-transparent" />
      <div className="sm:hidden w-5 h-7 absolute right-0 mr-5 bg-gradient-to-l from-white bg-transparent isolate" />
      <div className="overflow-scroll flex scrollbar-hidden">
        {NAVIGATION.map((item) => (
          <Link href={`${item.value}`}>
            <button type="button" className={`mr-5 text-lg font-extrabold ${pathname.includes(item.value) ? 'text-main-900' : 'text-dark-400 hover:text-dark-900'} transition duration-150 ease-in-out`}>
              <h2>
                {item.label}
              </h2>
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default InventoryLayout;
