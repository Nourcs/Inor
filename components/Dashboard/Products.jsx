import React from 'react';
import { Columns } from 'react-feather';
import Table from '../Table/Table';

const data = Array(10)
  .fill(undefined)
  .map((_, index) => ({
    id: `${index}`,
    index: `${index}`,
    name: `Name: ${index + 1}`,
    price: `Price: ${index + 1}`,
    sales: `Sales: ${index + 1}`,
    revenue: `Revenue: ${index + 1}`,
    sku: `sku: ${index + 1}`,
  }));

const columns = [
  {
    key: 'name', label: 'Name',
  },
  {
    key: 'price', label: 'Price',
  },
  {
    key: 'sales', label: 'Sales',
  },
  {
    key: 'revenue', label: 'Revenue',
  },
];

function Products({ products }) {
  return (
    <section className="w-full mt-10">
      <div className="flex items-center justify-between">
        <div className="text-lg font-extrabold">
          <h2>Top Products</h2>
        </div>
      </div>
      <div className="flex flex-col overflow-hidden mt-1 h-96">
        <Table
          showPagination={false}
          data={data}
          columns={columns}
          dataType={{ key: 'product', label: 'Product' }}
          customColumns={{
            name: ({ columnKey, row }) => (
              <td className="px-3 h-10">
                <div className="flex items-center">
                  <div className="mr-3 h-6 w-6 font-bold text-dark-100 bg-main-900 rounded-md flex items-center justify-center text-xs">
                    {Number(row.index) + 1}
                  </div>
                  {row[columnKey]}
                </div>
              </td>
            ),
          }}
        />
      </div>
    </section>
  );
}

export default Products;
