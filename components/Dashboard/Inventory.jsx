import React from 'react';

function Inventory({ inventory }) {
  return (
    <section className="flex-1 flex flex-col">
      <div
        className="mr-5 text-lg font-extrabold transition duration-100 ease-in-out text-dark-900"
      >
        Inventory Summary
      </div>
      <div className="mt-1 flex gap-[3px] flex-1 flex-wrap items-stretch">
        {inventory.map((item, index) => (
          <div
            key={`inventory_${index}`}
            className={`bg-dark-100 p-5 w-1/3 grow flex items-center justify-center flex-col ${index === 0 && 'rounded-tl-md'} ${index === 1 && 'rounded-tr-md'} ${index === 2 && 'rounded-bl-md'} ${index === 3 && 'rounded-br-md'}`}
          >
            <div className="text-main-900">
              {item.icon}
            </div>
            <div className="mt-5 text-2xl font-extrabold">
              {item.value.toLocaleString(undefined, { minimumFractionDigits: 0 })}
            </div>
            <div className="text-sm">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Inventory;
