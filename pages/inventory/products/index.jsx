import React, { useState } from 'react';

import { Package } from 'react-feather';
import Layout from '../../../components/Layouts/Layout';
import InventoryLayout from '../../../components/Layouts/Inventory';
import Modal from '../../../components/Modal/Modal';
import Table from '../../../components/Table/Table';
import AddProduct from '../../../components/Inventory/AddProduct';

const data = [
  {
    id: 'd47d00f064c24f55a778b26512377f12', sku: 'snshnimi', name: 'Sneakers', category: 'Shoes', supplier: 'Nike', warehouse: 'Miami', quantity: 15, price: 29.99, sales: 0,
  },
  {
    id: '4e27880b91744da28ddb163fc90e43f0', sku: 'eaacshmi', name: 'Earrings', category: 'Accessories', supplier: 'Shiva', warehouse: 'Miami', quantity: 20, price: 59.99, sales: 15,
  },
  {
    id: '99d7fb50a8c54365a17118f5602dca45', sku: 'tsaphmmi', name: 'T-Shirt', category: 'Apparel', supplier: 'H&M', warehouse: 'Miami', quantity: 20, price: 19.99, sales: 12,
  },
  {
    id: 'db2b4edc0b384537838fa96baa7af47c', sku: 'tbbazata', name: 'Tote Bag', category: 'Bags', supplier: 'ZARA', warehouse: 'Tampa', quantity: 300, price: 29.99, sales: 55,
  },
  {
    id: '58ed4caaecc44bf0ac0f79212746e833', sku: 'hbbashmi', name: 'Hand Bag', category: 'Bags', supplier: 'Shiva', warehouse: 'Miami', quantity: 10, price: 249.99, sales: 73,
  },
  {
    id: '8123f4951a854caa8d39afd7237787c1', sku: 'coaphmmi', name: 'Coat', category: 'Apparel', supplier: 'H&M', warehouse: 'Miami', quantity: 0, price: 129.99, sales: 300,
  },
  {
    id: '6379cbc6d77547c582e0a0dee50080ff', sku: 'puapzami', name: 'Pullover', category: 'Apparel', supplier: 'ZARA', warehouse: 'Miami', quantity: 4, price: 39.99, sales: 20,
  },
];

const columns = [
  {
    key: 'sku', label: 'SKU',
  },
  {
    key: 'name', label: 'Name',
  },
  {
    key: 'category', label: 'Category',
  },
  {
    key: 'supplier', label: 'Supplier',
  },
  {
    key: 'warehouse', label: 'Warehouse',
  },
  {
    key: 'quantity', label: 'Quantity',
  },
  {
    key: 'price', label: 'Price',
  },
  {
    key: 'sales', label: 'Sales',
  },
];

function Products() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="h-16 shrink-0 flex items-center px-5">
        <InventoryLayout />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden px-5">
        <Table
          showModal={(e) => setShowModal(true)}
          sticky="sku"
          selection
          pagination
          sort
          search
          data={data}
          columns={columns}
          dataType={{
            label: { s: 'Product', p: 'Products' }, key: { s: 'product', p: 'products' },
          }}
        />
      </div>
      <Modal
        icon={<Package className="h-5 w-5" />}
        open={showModal}
        close={() => setShowModal(false)}
        title="Add Product"
      >
        <AddProduct />
      </Modal>
    </div>
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
