import React from 'react';
import { Search } from 'react-feather';
import InventoryLayout from '../../components/Layouts/Inventory';

function Home() {
  return (
    <div className="p-5">
      <InventoryLayout />
      <div className="flex items-center justify-between mt-5">
        <div className="w-full max-w-lg border-2 border-dark-400 rounded-full flex items-center px-3 h-10">
          <div className="mr-3">
            <Search className="h-5 w-5 text-dark-600" />
          </div>
          <input
            type="text"
            className="w-full bg-transparent focus:outline-none pr-2 placeholder:text-dark-600 font-bold"
            placeholder="Search"
          />
        </div>
        <div className="flex items-center">
          <button type="button" className="border-2 border-orange-900 text-orange-900 font-bold text-sm h-10 px-5 rounded-full mr-3 flex items-center justify-center hover:bg-orange-900 hover:text-dark-100 transition duration-100 ease-in-out">
            Export All
          </button>
          <button type="button" className="text-dark-100 font-bold text-sm h-10 px-10 bg-orange-900 rounded-full flex items-center justify-center">
            Add Supplier
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
