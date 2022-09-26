import React from 'react';
import Layout from '../components/Layouts/Layout';

function Purchases() {
  return (
    <div>
      Purchases
    </div>
  );
}

Purchases.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Purchases;
