import React from 'react';

function Inventory({ inventory }) {
  return (
    <section className="flex-1 flex flex-col mt-5 lg:mt-0">
      <div
        className="mr-5 text-lg font-extrabold transition duration-100 ease-in-out text-dark-900"
      >
        Inventory Summary
      </div>
      <div className="rounded-lg mt-1 flex items-stretch justify-between gap-[3px] flex-wrap">
        {inventory.map((item, index) => (
          <div
            key={`inventory_${item.value}`}
            className={`bg-dark-100 px-5 py-4 w-1/3 sm:w-1/5 lg:w-full grow flex items-center justify-start flex-col ${index === 0 && 'rounded-tl-md'} ${index === 1 && 'rounded-tr-md'} ${index === 2 && 'rounded-bl-md'} ${index === 3 && 'rounded-br-md'}`}
          >
            <div className="text-main-900">
              {item.icon}
            </div>
            <div className="flex flex-col justify-center items-center">
              <h3 className="mt-5 text-xl font-extrabold">
                {item.value.toLocaleString(undefined, { minimumFractionDigits: 0 })}
              </h3>
              <h4 className="text-sm text-center">
                {item.name}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Inventory;
