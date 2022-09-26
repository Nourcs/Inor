import React from 'react';
import Layout from '../components/Layouts/Layout';

function Invoices() {
  return (
    <div>
      Invoice
    </div>
  );
}

Invoices.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Invoices;
