import React from 'react';
import Layout from '../components/Layouts/Layout';

function Sales() {
  return (
    <div>
      Sales
    </div>
  );
}

Sales.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Sales;
