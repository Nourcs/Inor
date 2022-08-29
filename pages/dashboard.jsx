import React, { useEffect, useState } from 'react';
import {
  ChevronDown, DollarSign, Layers, Maximize, Package, RefreshCcw, ShoppingCart, Tag, TrendingDown, TrendingUp, Truck, XSquare,
} from 'react-feather';

const SALES = [
  {
    id: 'sales',
    icon: <Tag className="h-6 w-6" />,
    name: 'Total Sales',
    value: 786,
    type: 'number',
  },
  {
    id: 'revenue',
    icon: <DollarSign className="h-6 w-6" />,
    name: 'Revenue',
    value: 17560,
    type: 'currency',
  },
  {
    id: 'cost',
    icon: <TrendingDown className="h-6 w-6" />,
    name: 'Cost',
    value: 12400,
    type: 'currency',

  },
  {
    id: 'profit',
    icon: <TrendingUp className="h-6 w-6" />,
    name: 'Profit',
    value: 5160,
    type: 'currency',
  },
];

const PURCHASES = [
  {
    id: 'purchases',
    icon: <ShoppingCart className="h-6 w-6" />,
    name: 'Total Purchases',
    value: 89,
    type: 'number',
  },
  {
    id: 'cancel-orders',
    icon: <XSquare className="h-6 w-6" />,
    name: 'Cancel Orders',
    value: 17560,
    type: 'number',
  },
  {
    id: 'cost',
    icon: <TrendingDown className="h-6 w-6" />,
    name: 'Cost',
    value: 22400,
    type: 'currency',

  },
  {
    id: 'returns',
    icon: <RefreshCcw className="h-6 w-6" />,
    name: 'Returns',
    value: 12,
    type: 'numbers',
  },
];

const TOP_PRODUCTS = [
  {
    link: '',
    name: 'Product One',
    sales: 253,
  },
  {
    link: '',
    name: 'Product Two',
    sales: 177,
  },
  {
    link: '',
    name: 'Product Three',
    sales: 135,
  },
  {
    link: '',
    name: 'Product Four',
    sales: 89,
  },
  {
    link: '',
    name: 'Product Five',
    sales: 88,
  },
  {
    link: '',
    name: 'Product Six',
    sales: 56,
  },
  {
    link: '',
    name: 'Product Seven',
    sales: 32,
  },
  {
    link: '',
    name: 'Product Eight',
    sales: 16,
  },
  {
    link: '',
    name: 'Product Nine',
    sales: 12,
  },
  {
    link: '',
    name: 'Product Ten',
    sales: 8,
  },
];

const INVENTORY_SUMMARY = [
  {
    icon: <Package className="h-5 w-5 text-orange-900" />,
    name: 'Total Products',
    value: 125,
  },
  {
    icon: <Layers className="h-5 w-5 text-orange-900" />,
    name: 'Total Categories',
    value: 3,
  },
  {
    icon: <Truck className="h-5 w-5 text-orange-900" />,
    name: 'Total Suppliers',
    value: 19,
  },
  {
    icon: <TrendingDown className="h-5 w-5 text-orange-900" />,
    name: 'Low Stock Products',
    value: 12,
  },
  {
    icon: <ShoppingCart className="h-5 w-5 text-orange-900" />,
    name: 'Total Orders',
    value: 37,
  },
];

function Home() {
  const [tab, setTab] = useState('sales');
  const [currentTab, setCurrentTab] = useState(SALES);
  useEffect(() => {
    setCurrentTab(tab === 'sales' ? SALES : PURCHASES);
  }, [tab]);
  return (
    <div className="p-5">
      <div className="flex gap-5">
        <div className="w-2/3 flex flex-col gap-5">
          <section>
            <div className="flex items-end justify-between">
              <div>
                <button
                  onClick={() => setTab('sales')}
                  type="button"
                  className={`mr-5 text-lg font-extrabold transition duration-100 ease-in-out ${tab === 'sales' ? 'text-dark-900' : 'text-dark-500 hover:text-dark-900'}`}
                >
                  Sales
                </button>
                <button
                  onClick={() => setTab('purchases')}
                  type="button"
                  className={`text-lg font-extrabold transition duration-100 ease-in-out ${tab === 'purchases' ? 'text-dark-900' : 'text-dark-500 hover:text-dark-900'}`}
                >
                  Purchases
                </button>
              </div>
              <div>
                <button type="button" className="flex items-center justify-center text-sm font-bold">
                  <span className="mr-2">All Time</span>
                  <div>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>
              </div>
            </div>
            <div className="rounded-lg shadow mt-2 flex items-center justify-between gap-[1px]">
              {currentTab.map((item, index) => (
                <div className={`text-dark-100 p-5 bg-orange-900 flex-1 flex flex-col items-center justify-center ${index === 0 && 'rounded-l-lg'} ${index === (SALES.length - 1) && 'rounded-r-lg'}`}>
                  <div>
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
          </section>
          <section className="bg-white shadow rounded-lg">
            <div className="flex items-center justify-between border-b border-dark-400 px-5 py-3">
              <div className="text-lg font-extrabold">
                Sales and Purchases Statistics
              </div>
              <div className="flex">
                <div className="flex items-center justify-center text-sm font-semibold mr-5">
                  <div className="h-2 w-2 bg-orange-900 rounded-full mr-2" />
                  Sales
                </div>
                <div className="flex items-center justify-center text-sm font-semibold mr-5">
                  <div className="h-2 w-2 bg-dark-600 rounded-full mr-2" />
                  Purchases
                </div>
                <button type="button" className="flex items-center justify-center text-sm font-bold pl-5 border-l border-dark-400">
                  <span className="mr-2">All Time</span>
                  <div>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>
              </div>
            </div>
            <div className="px-5 py-3">
              <img src="/chart.png" />
            </div>
          </section>
        </div>
        <div className="w-1/3 bg-white shadow rounded-lg flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-dark-400 px-5 py-3">
            <div className="text-lg font-extrabold">
              Activity Feed
            </div>
          </div>
          <div className="px-5 py-3 flex-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </div>

        </div>
      </div>
      <div className="flex mt-5 gap-5">
        <div className="flex-1">
          <button
            type="button"
            className="mr-5 text-lg font-extrabold transition duration-100 ease-in-out text-dark-900"
          >
            Top Products
          </button>
          <div className="mt-2 bg-white shadow rounded-md h-80 overflow-y-scroll">
            <div className="px-4 py-2 border-b border-dark-400 text-sm font-bold flex items-center">
              <span className="block flex-1">Name</span>
              <span className="block flex-1 -ml-5">Total Sales</span>
            </div>
            {TOP_PRODUCTS.map((item, index) => (
              <button type="button" className={`group flex items-center w-full text-left p-4 hover:bg-dark-100 transition duration-100 ease-in-out ${index !== 0 && 'border-t border-dark-400'}`}>
                <div className="flex-1 flex items-center">
                  <div className="mr-3 h-6 w-6 font-bold text-dark-100 bg-orange-900 rounded-full flex items-center justify-center text-xs">
                    {index + 1}
                  </div>
                  {item.name}
                </div>
                <div className="flex-1">
                  {item.sales}
                </div>
                <div>
                  <Maximize className="h-5 w-5 text-dark-600 group-hover:text-dark-900 transition duration-100 ease-in-out" />
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1">
          <button
            type="button"
            className="mr-5 text-lg font-extrabold transition duration-100 ease-in-out text-dark-900"
          >
            Inventory Summary
          </button>
          <div className="mt-2 h-80 flex flex-col justify-between gap-3">
            {INVENTORY_SUMMARY.map((item) => (
              <div className="flex-1 bg-white shadow rounded-md px-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-3">
                    {item.icon}
                  </div>
                  <div className="font-bold">{item.name}</div>
                </div>
                <div className="text-lg font-extrabold">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
