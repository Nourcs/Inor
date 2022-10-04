import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'react-feather';
import OutsideClickHandler from 'react-outside-click-handler';

function MenuComponent({ setFilter, options, filter }) {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setFilterOpen(false);
      }}
    >
      <div className="relative float-right">
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          type="button"
          className="flex items-center justify-center text-sm font-bold group"
        >
          <span className="mr-2 text-ellipsis overflow-hidden whitespace-nowrap">{filter.label}</span>
          <div className="text-dark-500 group-hover:text-main-900 transition duration-100 ease-in-out">
            {!filterOpen && (<ChevronDown className="h-4 w-4" />)}
            {filterOpen && (<ChevronUp className="h-4 w-4" />
            )}
          </div>
        </button>

        <div
          style={{
            boxShadow: 'rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px',
            transition: 'visibility 0.15s, opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          className={`absolute text-sm bg-white z-10 w-56 right-0 rounded-md overflow-y-auto mt-2 max-h-40  ${filterOpen ? 'visible opacity-100' : 'opacity-0 invisible'}`}
        >
          {options.map((item) => (
            <button
              type="button"
              onClick={() => {
                setFilter(item);
                setFilterOpen(false);
              }}
              className={`w-full text-left p-3 border-b last-border-none border-dark-100 ${filter.value === item.value ? 'bg-main-900 text-white' : 'hover:bg-dark-100'}`}
            >
              {item.label}

            </button>
          ))}
        </div>

      </div>
    </OutsideClickHandler>
  );
}

export default MenuComponent;
