import React from 'react';
import { Maximize } from 'react-feather';

function Expand({ rowData }) {
  return (
    <button type="button" className="flex items-center justify-center w-full h-full text-dark-400 hover:text-main-900 transition duration-150 ease-in-out">
      <div>
        <Maximize className="w-5 h-5" />
      </div>
    </button>
  );
}

export default Expand;
