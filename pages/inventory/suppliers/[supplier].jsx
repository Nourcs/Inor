import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../../components/Layouts/Layout';

function Supplier() {
  const { query: { supplier } } = useRouter();
  return (
    <div className="p-5">
      Supplier
      {' '}
      {supplier}
    </div>
  );
}

Supplier.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Supplier;
