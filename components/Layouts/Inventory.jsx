import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const NAVIGATION = [
  { name: 'Products', value: 'products' },
  { name: 'Categories', value: 'categories' },
  { name: 'Suppliers', value: 'suppliers' },
  { name: 'Warehouses', value: 'warehouses' },
];

function InventoryLayout({ children }) {
  const { pathname } = useRouter();
  return (
    <>
      {NAVIGATION.map((item) => (
        <Link href={`${item.value}`}>
          <button type="button" className={`mr-5 text-lg font-extrabold ${pathname.includes(item.value) ? 'text-main-900' : 'text-dark-400 hover:text-dark-900'}`}>
            {item.name}
          </button>
        </Link>
      ))}
    </>
  );
}

export default InventoryLayout;
