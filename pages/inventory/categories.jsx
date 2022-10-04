import React from 'react';

import Layout from '../../components/Layouts/Layout';
import InventoryLayout from '../../components/Layouts/Inventory';

import Table from '../../components/Table/Table';

const data = Array(50)
  .fill(undefined)
  .map((_, index) => ({
    sku: `${index + 1}`,
    name: `Name: ${index + 1}`,
    category: `Category: ${index + 1}`,
    supplier: `Supplier:${index + 1}`,
    warehouse: `Warehouse: ${index + 1}`,
    quantity: `Quantity: ${index + 1}`,
    price: `Price: ${index + 1}`,
    sales: `Sales: ${index + 1}`,
  }));

const columns = [
  {
    key: 'sku', title: 'SKU', width: 175,
  },
  {
    key: 'name', title: 'Name', width: 200,
  },
  {
    key: 'category', title: 'Category', width: 175,
  },
  {
    key: 'supplier', title: 'Supplier', width: 175,
  },
  {
    key: 'warehouse', title: 'Warehouse', width: 175,
  },
  {
    key: 'quantity', title: 'Quantity', width: 175,
  },
  {
    key: 'price', title: 'Price', width: 175,
  },
  {
    key: 'sales', title: 'Sales', width: 175,
  },
];

function Categories() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="h-16 shrink-0 flex items-center px-5">
        <InventoryLayout />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden px-5">
        <Table
          showPagination
          data={data}
          columns={columns}
          type={{ label: 'Category', key: 'category' }}
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
