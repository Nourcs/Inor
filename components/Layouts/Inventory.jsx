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
    <>
      {NAVIGATION.map((item) => (
        <Link href={`${item.value}`}>
          <button type="button" className={`mr-5 text-lg font-extrabold ${pathname.includes(item.value) ? 'text-main-900' : 'text-dark-400 hover:text-dark-900'} transition duration-150 ease-in-out`}>
            <div className={`${pathname.includes(item.value) ? 'hidden' : ''} sm:hidden`}>
              {item.icon}
            </div>
            <h2 className={`${pathname.includes(item.value) ? '' : 'hidden'} sm:block`}>
              {item.label}
            </h2>
          </button>
        </Link>
      ))}
    </>
  );
}

export default InventoryLayout;
