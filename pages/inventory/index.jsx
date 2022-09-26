import React from 'react';
import Layout from '../../components/Layouts/Layout';

function Inventory() {
  return (
    <div>
      Inventory
    </div>
  );
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/inventory/products',
      permanent: false,
    },
  };
}

Inventory.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Inventory;
