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
    <section id="summary">
      <div className="flex items-end justify-between">
        <div className="mr-5">
          <button
            onClick={() => setTab('sales')}
            type="button"
            className={`mr-5 text-lg font-extrabold transition duration-100 ease-in-out ${tab === 'sales' ? 'text-main-900' : 'text-dark-400 hover:text-dark-900'}`}
          >
            <h2>
              Sales
            </h2>
          </button>
          <button
            onClick={() => setTab('purchases')}
            type="button"
            className={`text-lg font-extrabold transition duration-100 ease-in-out ${tab === 'purchases' ? 'text-main-900' : 'text-dark-400 hover:text-dark-900'}`}
          >
            <h2>
              Purchases
            </h2>
          </button>
        </div>
        <Menu filter={filter} setFilter={setFilter} options={duration} />
      </div>
      <div className="rounded-lg mt-1 flex items-stretch justify-between gap-[3px] flex-wrap">
        {data.map((item, index) => (
          <section
            key={`summary_data_${item.value}`}
            className={`text-dark-900 px-5 py-4 bg-dark-100 w-1/3 sm:w-1/5 grow flex flex-col items-center justify-start ${index === 0 && 'rounded-l-lg'} ${index === (data.length - 1) && 'rounded-r-lg'}`}
          >
            <div className="text-main-900">
              {item.icon}
            </div>
            <div className="flex flex-col justify-center items-center">
              <h3 className="mt-5 text-xl font-extrabold">
                {item.type === 'currency' && '$'}
                {item.value.toLocaleString(undefined, { minimumFractionDigits: 0 })}
              </h3>
              <h4 className="text-sm text-center">
                {item.name}
              </h4>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}

export default Summary;
