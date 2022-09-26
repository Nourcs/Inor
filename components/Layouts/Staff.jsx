import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const NAVIGATION = [
  { name: 'Employees', value: 'employees' },
  { name: 'Positions', value: 'positions' },
  { name: 'Locations', value: 'locations' },
  { name: 'Teams', value: 'teams' },
];

function InventoryLayout({ children }) {
  const { pathname } = useRouter();
  return (
    <div>
      {NAVIGATION.map((item) => (
        <Link href={`${item.value}`}>
          <button type="button" className={`mr-5 text-lg font-black ${pathname.includes(item.value) ? 'text-main-900' : 'text-dark-600 hover:text-dark-900'}`}>
            {item.name}
          </button>
        </Link>
      ))}
    </div>
  );
}

export default InventoryLayout;
