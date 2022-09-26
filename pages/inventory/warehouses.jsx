import React, { useState } from 'react';

import { Search } from 'react-feather';
import InventoryLayout from '../../components/Layouts/Inventory';
import Layout from '../../components/Layouts/Layout';

import Table from '../../components/Table/Table';
import Modal from '../../components/Modal/Modal';

const DATA = [
  {
    code: 1, name: 'Sneakers',
  },
  {
    code: 4, name: 'T-Shirt',
  },
  {
    code: 5, name: 'Coat',
  },
];

const HEADINGS = [
  { label: 'Code', value: 'code' },
  { label: 'Name', value: 'name' },
  { label: '', value: '' },
  { label: '', value: '' },
  { label: '', value: '' },
  { label: '', value: '' },
  { label: '', value: '' },

];

function Warehouses() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex-1 flex flex-col justify-between overflow-hidden">
        <div className="p-5">
          <InventoryLayout />
        </div>
        <Table initialData={DATA} headings={HEADINGS} search={search}>
          <div className="w-full max-w-lg border-2 border-dark-300 rounded-full flex items-center px-3 h-10">
            <div className="mr-3">
              <Search className="h-5 w-5 text-dark-400" />
            </div>
            <input
              type="text"
              className="w-full bg-transparent focus:outline-none pr-2 placeholder:text-dark-400 font-bold"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <button type="button" className="border-2 border-main-900 text-main-900 font-bold text-sm h-10 px-5 rounded-full mr-3 flex items-center justify-center hover:bg-main-900 hover:text-dark-100 transition duration-100 ease-in-out">
              Export All
            </button>
            <button
              onClick={() => setShowModal(!showModal)}
              type="button"
              className="text-dark-100 font-bold text-sm h-10 px-10 bg-main-900 rounded-full flex items-center justify-center"
            >
              Add Warehouse
            </button>
          </div>
        </Table>
      </div>
      {showModal && (
      <Modal closeModal={() => setShowModal(false)} title="Add Warehouse" />
      )}
    </>

  );
}

Warehouses.getLayout = function getLayout(page) {
  return (
    <div className="text-dark-900">
      <Layout>
        {page}
      </Layout>
    </div>
  );
};

export default Warehouses;
