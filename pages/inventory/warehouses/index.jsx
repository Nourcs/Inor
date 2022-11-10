import React from 'react';

import Layout from '../../../components/Layouts/Layout';
import InventoryLayout from '../../../components/Layouts/Inventory';

import Table from '../../../components/Table/Table';

function Warehouses() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="h-16 shrink-0 flex items-center px-5">
        <InventoryLayout />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden px-5">
        <Table
          pagination
          selection
          sort
          search
          dataType={{
            label: { s: 'Warehouse', p: 'Warehouses' }, key: { s: 'warehouse', p: 'warehouses' },
          }}
        />
      </div>
    </div>
  );
}

Warehouses.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Warehouses;
