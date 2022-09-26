import React, { useState } from 'react';
import { Search } from 'react-feather';

import Layout from '../../components/Layouts/Layout';
import InventoryLayout from '../../components/Layouts/Inventory';

import Table from '../../components/Table/Table';
import Modal from '../../components/Modal/Modal';

const DATA = [
  {
    sku: 1, name: 'Sneakers', category: 'Shoes', supplier: 'American Eagle', quantity: 12, price: 39.99, sales: 8,
  },
  {
    sku: 4, name: 'T-Shirt', category: 'Clothes', supplier: 'Nike', quantity: 52, price: 19.99, sales: 22,
  },
  {
    sku: 5, name: 'Coat', category: 'Clothes', supplier: 'H&M', quantity: 8, price: 99.99, sales: 0,
  },
  {
    sku: 2, name: 'Boots', category: 'Shoes', supplier: 'Timberland', quantity: 40, price: 129.99, sales: 38,
  },
  {
    sku: 3, name: 'Pullover', category: 'Clothes', supplier: 'American Eagle', quantity: 20, price: 39.99, sales: 12,
  },
  {
    sku: 6, name: 'Shirt', category: 'Clothes', supplier: 'Zara', quantity: 120, price: 29.99, sales: 68,
  },
  {
    sku: 7, name: 'Perfume', category: 'Body Care', supplier: 'Forever 21', quantity: 10, price: 145.29, sales: 3,
  },
  {
    sku: 8, name: 'A', category: 'ZA', supplier: 'Forever 21', quantity: 10, price: 145.29, sales: 3,
  },
  {
    sku: 9, name: 'C', category: 'CA', supplier: 'Forever 22', quantity: 14, price: 145.29, sales: 0,
  },
  {
    sku: 10, name: 'B', category: 'CB', supplier: 'Forever 23', quantity: 13, price: 145.29, sales: 0,
  },
  {
    sku: 11, name: 'E', category: 'MC', supplier: 'Forever 25', quantity: 12, price: 145.29, sales: 0,
  },
  {
    sku: 12, name: 'K', category: 'EO', supplier: 'Forever 24', quantity: 12, price: 145.29, sales: 0,
  },
  {
    sku: 13, name: 'O', category: 'EA', supplier: 'Forever 26', quantity: 15, price: 145.29, sales: 14,
  },
  {
    sku: 20, name: 'OP', category: 'NO', supplier: 'Forever 28', quantity: 16, price: 145.29, sales: 12,
  },
  {
    sku: 15, name: 'OE', category: 'NO', supplier: 'Forever 27', quantity: 71, price: 145.29, sales: 34,
  },
  {
    sku: 18, name: 'LE', category: 'RO', supplier: 'Forever 30', quantity: 34, price: 145.29, sales: 32,
  },
  {
    sku: 17, name: 'LP', category: 'RON', supplier: 'Forever 32', quantity: 43, price: 145.29, sales: 27,
  },
  {
    sku: 16, name: 'LA', category: 'ROE', supplier: 'Forever 35', quantity: 66, price: 145.29, sales: 23,
  },
  {
    sku: 19, name: 'XE', category: 'AS', supplier: 'Forever 49', quantity: 31, price: 145.29, sales: 8,
  },
  {
    sku: 14, name: 'ZA', category: 'AT', supplier: 'Forever 41', quantity: 27, price: 145.29, sales: 6,
  },
];

const HEADINGS = [
  { label: 'SKU', value: 'sku' },
  { label: 'Name', value: 'name' },
  { label: 'Category', value: 'category' },
  { label: 'Supplier', value: 'supplier' },
  { label: 'Quantity', value: 'quantity' },
  { label: 'Price', value: 'price' },
  { label: 'Sales', value: 'sales' },
];

function Products() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="h-16  shrink-0 flex items-center px-5">
        <InventoryLayout />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto px-5 pb-5 flex">
          <Table />
        </div>
        <div className="h-16 shrink-0 border-t border-dark-300" />
      </div>
    </div>
  // <>
  //   <div className="flex-1 flex flex-col justify-between overflow-hidden">
  //     <div className="p-5">
  //
  //     </div>
  //     <Table initialData={DATA} headings={HEADINGS} search={search}>
  //       <div className="w-full max-w-lg border-2 border-dark-300 rounded-full flex items-center px-3 h-10">
  //         <div className="mr-3">
  //           <Search className="h-5 w-5 text-dark-400" />
  //         </div>
  //         <input
  //           type="text"
  //           className="w-full bg-transparent focus:outline-none pr-2 placeholder:text-dark-400 font-bold"
  //           placeholder="Search"
  //           value={search}
  //           onChange={(e) => setSearch(e.target.value)}
  //         />
  //       </div>
  //       <div className="flex items-center">
  //         <button type="button" className="border-2 border-main-900 text-main-900 font-bold text-sm h-10 px-5 rounded-full mr-3 flex items-center justify-center hover:bg-main-900 hover:text-dark-100 transition duration-100 ease-in-out">
  //           Export All
  //         </button>
  //         <button
  //           onClick={() => setShowModal(!showModal)}
  //           type="button"
  //           className="text-dark-100 font-bold text-sm h-10 px-10 bg-main-900 rounded-full flex items-center justify-center"
  //         >
  //           Add Product
  //         </button>
  //       </div>
  //     </Table>
  //   </div>
  //   {showModal && (
  //   <Modal closeModal={() => setShowModal(false)} title="Add Product" />
  //   )}
  // </>

  );
}

Products.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Products;
