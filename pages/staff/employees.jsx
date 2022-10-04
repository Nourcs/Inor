import React from 'react';
import Layout from '../../components/Layouts/Layout';

function Employees() {
  const nu = null;
  return (
    <div>
      Hello World
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
