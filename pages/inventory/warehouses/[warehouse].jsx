import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../../components/Layouts/Layout';

function Warehouse() {
  const { query: { warehouse } } = useRouter();
  return (
    <div className="p-5">
      Warehouse
      {' '}
      {warehouse}
    </div>
  );
}

Warehouse.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Warehouse;
