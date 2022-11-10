import React from 'react';

import Layout from '../../../components/Layouts/Layout';
import InventoryLayout from '../../../components/Layouts/Inventory';

import Table from '../../../components/Table/Table';

const data = [
  {
    id: 'd47d00f064c24f55a778b26512377f12', name: 'Nike', phone: '+216 51 802 152', email: 'nourcherifsoussi@gmail.com',
  },
  {
    id: 'd47d00f064c24f55a778b26512377f12', name: 'Shiva', phone: '+216 22 226 032', email: 'nour@daycationapp.com',
  },
  {
    id: 'd47d00f064c24f55a778b26512377f12', name: 'H&M', phone: '+1 786 806 4124', email: 'nourcherif.soussi@esprit.tn',
  },
  {
    id: 'd47d00f064c24f55a778b26512377f12', name: 'ZARA', phone: '+216 24 533 375', email: 'nourcs@gmail.com',
  },
];

const columns = [
  { key: 'name', label: 'Name', width: 175 },
  { key: 'phone', label: 'Phone', width: 175 },
  { key: 'email', label: 'Email' },
];

function Suppliers() {
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
            label: { s: 'Supplier', p: 'Suppliers' }, key: { s: 'supplier', p: 'suppliers' },
          }}
        />
      </div>
    </div>
  );
}

Suppliers.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Suppliers;
