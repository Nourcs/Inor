import React from 'react';

import Layout from '../../components/Layouts/Layout';
import Staff from '../../components/Layouts/Staff';

import Table from '../../components/Table/Table';

const data = Array(30)
  .fill(undefined)
  .map((_, index) => ({
    id: `${index + 1}`,
    name: `Name: ${index + 1}`,
    phone: `Phone: ${index + 1}`,
    role: `Category: ${index + 1}`,
    position: `Supplier: ${index + 1}`,
    team: `Warehouse: ${index + 1}`,
    quantity: `Quantity: ${index + 1}`,
    location: `Price: ${index + 1}`,
  }));

const columns = [
  {
    key: 'name', label: 'Full Name / Phone', width: 200,
  },
  {
    key: 'role', label: 'Category', width: 175,
  },
  {
    key: 'position', label: 'Supplier', width: 175,
  },
  {
    key: 'team', label: 'Warehouse', width: 175,
  },
  {
    key: 'location', label: 'Quantity', width: 175,
  },

];

function Employees() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="h-16 shrink-0 flex items-center px-5">
        <Staff />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden px-5">
        <Table
          pagination
          selection
          search
          sort
          data={data}
          columns={columns}
          customColumns={{
            name: ({ columnKey, row: { phone, name } }) => {
              const initials = name.split(' ').map((item) => item[0]).join('');
              return (
                <td className="h-20">
                  <div className="flex items-center">
                    <div className="mr-3 h-10 w-10 font-bold text-white bg-dark-300 rounded-full flex items-center justify-center text-xs">
                      {initials}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">{name}</span>
                      <span>{phone}</span>
                    </div>
                  </div>
                </td>
              );
            },
          }}
          dataType={{
            label: 'Employee', key: 'employee',
          }}
        />
      </div>
    </div>
  );
}

Employees.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Employees;
