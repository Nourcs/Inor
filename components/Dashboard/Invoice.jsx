import React from 'react';
import { ShoppingCart, Tag } from 'react-feather';

function NewInvoice() {
  return (
    <section className="flex flex-col flex-1" id="new-invoice">
      <div className="flex items-center justify-between">
        <div className="text-lg font-extrabold">
          <h2>Create New Invoice</h2>
        </div>
      </div>
      <div className="flex gap-3 flex-1 mt-1">
        <button type="button" className="h-16 lg:h-full rounded-md flex items-center justify-center bg-dark-100 hover:bg-main-900 hover:text-white transition duration-150 ease-in-out w-full font-extrabold text-dark-900">
          <div className="mr-3">
            <Tag className="h-5 w-5" />
          </div>
          Sale
        </button>
        <button type="button" className="h-16 lg:h-full rounded-md flex items-center justify-center bg-dark-100 hover:bg-main-900 hover:text-white transition duration-150 ease-in-out w-full font-extrabold text-dark-900">
          <div className="mr-3">
            <ShoppingCart className="h-5 w-5" />
          </div>
          Purchase
        </button>
      </div>
    </section>
  );
}

export default NewInvoice;
