import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../../components/Layouts/Layout';

function Product() {
  const { query: { product } } = useRouter();
  return (
    <div className="p-5">
      Hello Wolrd
      {' '}
      {product}
    </div>
  );
}

Product.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Product;
