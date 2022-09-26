import React, { useState, useEffect } from 'react';
import Menu from '../Modal/Menu';
import { duration } from '../../constants/constants';

function Summary({ sales, purchases }) {
  const [tab, setTab] = useState('sales');
  const [filter, setFilter] = useState({ label: 'All Time', value: 'alltime' });
  const [data, setData] = useState(sales);

  useEffect(() => {
    setData(tab === 'sales' ? sales : purchases);
  }, [tab]);

  return (
    <>
      <div className="flex items-end justify-between">
        <div>
          <button
            onClick={() => setTab('sales')}
            type="button"
            className={`mr-5 text-lg font-extrabold transition duration-100 ease-in-out ${tab === 'sales' ? 'text-main-900' : 'text-dark-400 hover:text-dark-900'}`}
          >
            Sales
          </button>
          <button
            onClick={() => setTab('purchases')}
            type="button"
            className={`text-lg font-extrabold transition duration-100 ease-in-out ${tab === 'purchases' ? 'text-main-900' : 'text-dark-400 hover:text-dark-900'}`}
          >
            Purchases
          </button>
        </div>
        <Menu filter={filter} setFilter={setFilter} options={duration} />
      </div>
      <div className="rounded-lg mt-1 flex items-center justify-between gap-[3px]">
        {data.map((item, index) => (
          <div key={`data_${index}`} className={`text-dark-900 p-5 bg-dark-100 flex-1 flex flex-col items-center justify-center ${index === 0 && 'rounded-l-lg'} ${index === (data.length - 1) && 'rounded-r-lg'}`}>
            <div className="text-main-900">
              {item.icon}
            </div>
            <div className="mt-5 text-2xl font-extrabold">
              {item.type === 'currency' && '$'}
              {item.value.toLocaleString(undefined, { minimumFractionDigits: 0 })}
            </div>
            <div className="text-sm">
              {item.name}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Summary;
