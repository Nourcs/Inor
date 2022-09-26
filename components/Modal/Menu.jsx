import React, { useState } from 'react';
import { ChevronDown } from 'react-feather';
import OutsideClickHandler from 'react-outside-click-handler';

function Menu({
  setFilter, options, filter,
}) {
  const [filterOpen, setFilterOpen] = useState(false);
  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center justify-center text-sm font-bold group"
        onClick={() => setFilterOpen(!filterOpen)}
      >
        <span className="mr-2">{filter.label}</span>
        <div className="text-dark-500 group-hover:text-main-900 transition duration-100 ease-in-out">
          <ChevronDown className="h-4 w-4" />
        </div>
      </button>
      {filterOpen && (
        <>
          <div className="w-screen h-screen inset-0 fixed z-40" onClick={() => setFilterOpen(false)} />
          <div className="absolute bg-white shadow-md right-0 w-48 mt-1 z-50 text-sm overflow-y-scroll max-h-48 rounded-md">
            {options.map((item) => (
              <button
                type="button"
                className={`py-2 w-full flex flex-col items-start px-3 border-b border-dark-100 ${item.value === filter.value ? 'bg-main-900 text-white' : 'hover:bg-dark-100'}`}
                onClick={() => {
                  setFilter(item);
                  setFilterOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Menu;

{ /* <div className="relative">
      <button
        type="button"
        className="flex items-center justify-center text-sm font-bold group"
        onClick={() => !filterOpen && setFilterOpen(true)}
      >
        <span className="mr-2">{filter.label}</span>
        <div className="text-dark-500 group-hover:text-main-900 transition duration-100 ease-in-out">
          <ChevronDown className="h-4 w-4" />
        </div>
      </button>
      {filterOpen && (
        <OutsideClickHandler
          onOutsideClick={() => setFilterOpen(false)}
        >
          <div className="absolute bg-white border border-dark-300 right-0 w-40 mt-1 z-50 text-sm overflow-y-scroll max-h-[150px] rounded-md">
            {options.map((item) => (
              <button
                type="button"
                className={`py-2 w-full flex flex-col items-start px-3 border-b border-dark-100 ${item.value === filter.value ? 'bg-main-900 text-white' : 'hover:bg-dark-100'}`}
                onClick={() => {
                  setFilter(item);
                  setFilterOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </OutsideClickHandler>
      )}
    </div> */ }
