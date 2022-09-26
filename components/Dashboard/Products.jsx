import React from 'react';
import { Maximize } from 'react-feather';

function Products({ products }) {
  return (
    <section className="w-2/3">
      <button
        type="button"
        className="mr-5 text-lg font-extrabold transition duration-100 ease-in-out"
      >
        Top Products
      </button>
      <div className="mt-1 px-4 py-2 bg-main-900 text-dark-100 text-sm font-bold flex items-center rounded-t-md">
        <span className="block flex-[1.5_1.5_0%]">Name</span>
        <span className="block flex-1">Price</span>
        <span className="block flex-1">Sales</span>
        <span className="block flex-1">Revenue</span>
        <span className="w-10 ml-4" />
      </div>
      <div className="bg-dark-100 rounded-b-md h-80 overflow-y-scroll">
        {products.map((item, index) => (
          <button key={`product_${index}`} type="button" className={`group flex items-stretch w-full text-left p-4 transition duration-100 ease-in-out hover:bg-dark-200 ${index !== 0 && 'border-t border-dark-300'}`}>
            <div className="flex-[1.5_1.5_0%] flex items-center">
              <div className="mr-3 h-6 w-6 font-bold text-dark-100 bg-main-900 rounded-md flex items-center justify-center text-xs">
                {index + 1}
              </div>
              {item.name}
            </div>
            <div className="flex-1">
              $
              {item.price}
            </div>
            <div className="flex-1">
              {item.sales.toLocaleString(undefined, { minimumFractionDigits: 0 })}
            </div>
            <div className="flex-1">
              $
              {item.revenue.toLocaleString(undefined, { minimumFractionDigits: 0 })}
            </div>
            <div className="w-10 flex items-center justify-end">
              <Maximize className="h-5 w-5 text-dark-600 group-hover:text-main-900 transition duration-100 ease-in-out" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Products;
