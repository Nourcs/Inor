import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const NAVIGATION = [
  { name: 'Products', value: 'products' },
  { name: 'Categories', value: 'categories' },
  { name: 'Suppliers', value: 'suppliers' },
];

function InventoryLayout({ children }) {
  const { pathname } = useRouter();
  return (
    <div>
      {NAVIGATION.map((item) => (
        <Link href={`${item.value}`}>
          <button type="button" className={`mr-5 text-lg font-black ${pathname.includes(item.value) ? 'text-orange-900' : 'text-dark-600 hover:text-dark-900'}`}>
            {item.name}
          </button>
        </Link>
      ))}
    </div>
  );
}

export default InventoryLayout;
