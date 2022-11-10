import React from 'react';

import Layout from '../../../components/Layouts/Layout';
import InventoryLayout from '../../../components/Layouts/Inventory';

import Table from '../../../components/Table/Table';

const data = [
  { id: 'd47d00f064c24f55a778b26512377f12', name: 'Shoes' },
  { id: 'd47d00f064c24f55a778b26512377f12', name: 'Accessories' },
  { id: 'd47d00f064c24f55a778b26512377f12', name: 'Apparel' },
  { id: 'd47d00f064c24f55a778b26512377f12', name: 'Bags' },
];

const columns = [
  { key: 'name', label: 'Name' },
];

function Categories() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="h-16 shrink-0 flex items-center px-5">
        <InventoryLayout />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden px-5">
        <Table
          data={data}
          columns={columns}
          pagination
          selection
          sort
          search
          dataType={{
            label: { s: 'Category', p: 'Categories' }, key: { s: 'category', p: 'categories' },
          }}
        />
      </div>
    </div>
  );
}

Categories.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Categories;
