import React, { useState } from 'react';
import {
  Check, Grid,
} from 'react-feather';
import OutsideClickHandler from 'react-outside-click-handler';
import { useSnackbar } from 'notistack';

function MenuComponent({ columns, setColumns, filteredColumns }) {
  const { enqueueSnackbar } = useSnackbar();
  const [filterOpen, setFilterOpen] = useState(false);

  const handleSelection = (item) => {
    const newColumns = [...columns];
    const index = newColumns.indexOf(item);
    if (newColumns[index].hidden) {
      newColumns[index].hidden = false;
    } else if (filteredColumns.length !== 1 && !newColumns[index].hidden) {
      newColumns[index].hidden = true;
    } else {
      enqueueSnackbar('The table must contain at least one column.', { variant: 'error', preventDuplicate: true });
    }
    setColumns(newColumns);
  };

  const selectAll = () => {
    const newColumns = [...columns].map((item) => ({ ...item, hidden: false }));
    setColumns(newColumns);
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setFilterOpen(false);
      }}
    >
      <div className="relative">
        <button
          onClick={() => setFilterOpen(!filterOpen)}
          type="button"
          className="h-10 w-10 flex items-center justify-center border-2 border-main-900 rounded-md sm:mr-3 text-main-900 hover:bg-main-900 hover:text-white transition duration-150 ease-in-out"
        >
          <div>
            <Grid className="h-5 w-5" strokeWidth={2.5} />
          </div>
        </button>
        <div
          style={{
            boxShadow: 'rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px',
            transition: 'visibility 0.15s, opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
          className={`absolute text-sm bg-white z-20 w-56 right-0 sm:-right-20 rounded-md overflow-y-auto mt-2 max-h-40  ${filterOpen ? 'visible opacity-100' : 'opacity-0 invisible'}`}
        >
          <button
            onClick={() => selectAll()}
            type="button"
            className="h-12 flex items-center w-full p-3 border-b last:border-none border-dark-100 hover:bg-dark-100"
          >
            <div

              className="-mt-[1px] mr-3 flex items-center justify-center"
            >
              <div
                className={`h-[15px] w-[15px] border-2 flex items-center justify-center rounded-sm  transition duration-150 ease-in-out ${filteredColumns.length === columns.length ? 'bg-main-900 border-main-900' : 'border-dark-300 hover:border-main-900'}`}
              >
                {filteredColumns.length === columns.length && (
                  <div>
                    <Check className="text-dark-100 h-3 w-3" strokeWidth={3} />
                  </div>
                ) }
              </div>
            </div>
            Show All
          </button>
          {columns.map((item) => (
            <button
              onClick={() => handleSelection(item)}
              type="button"
              className="h-12 flex items-center w-full p-3 border-b last:border-none border-dark-100 hover:bg-dark-100"
            >
              <div

                className="-mt-[1px] mr-3 flex items-center justify-center"
              >
                <div
                  className={`h-[15px] w-[15px] border-2 flex items-center justify-center rounded-sm  transition duration-150 ease-in-out ${!item.hidden ? 'bg-main-900 border-main-900' : 'border-dark-300 hover:border-main-900'}`}
                >
                  {!item.hidden && (
                  <div>
                    <Check className="text-dark-100 h-3 w-3" strokeWidth={3} />
                  </div>
                  )}
                </div>
              </div>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </OutsideClickHandler>
  );
}

export default MenuComponent;
