import React, { useState, useEffect } from 'react';
import { Package, ShoppingCart, Tag } from 'react-feather';
import Menu from '../Modal/Menu';
import { duration } from '../../constants/constants';

const navigation = [
  { label: 'Sales', key: 'sales', icon: <Tag className="h-5 w-5" /> },
  { label: 'Purchases', key: 'purchases', icon: <ShoppingCart className="h-5 w-5" /> },
  { label: 'Inventory', key: 'inventory', icon: <Package className="h-5 w-5" /> },
];

function Layout({ data }) {
  return (
    <>
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
    </>
  );
}
function Summary({ sales, purchases, inventory }) {
  const [tab, setTab] = useState('sales');
  const [filter, setFilter] = useState({ label: 'All Time', value: 'alltime' });
  const [data, setData] = useState(sales);

  useEffect(() => {
    setData(tab === 'sales' ? sales : purchases);
  }, [tab]);

  return (
    <section id="summary">
      <div className="flex items-center justify-between">
        <div className="mr-5 flex items-center">
          {navigation.map((item) => (
            <button
              onClick={() => setTab(item.key)}
              type="button"
              className={`flex items-center mr-5 text-lg font-extrabold transition duration-100 ease-in-out ${tab === item.key ? 'text-main-900' : 'text-dark-400 hover:text-dark-900'}`}
            >
              <div className={`${tab === item.key ? 'hidden' : ''} sm:hidden`}>
                {item.icon}
              </div>
              <h2 className={`${tab === item.key ? '' : 'hidden'} sm:block`}>
                {item.label}
              </h2>
            </button>
          ))}

        </div>
        <Menu filter={filter} setFilter={setFilter} options={duration} />
      </div>
      <div className="rounded-lg mt-1 flex items-stretch justify-between gap-[3px] flex-wrap">
        {
         {
           sales: <Layout data={sales} />,
           purchases: <Layout data={purchases} />,
           inventory: <Layout data={inventory} />,
         }[tab]
      }

      </div>
    </section>
  );
}

export default Summary;
