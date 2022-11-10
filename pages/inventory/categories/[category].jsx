import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../../components/Layouts/Layout';

function Category() {
  const { query: { category } } = useRouter();
  return (
    <div className="p-5">
      Category
      {' '}
      {category}
    </div>
  );
}

Category.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Category;
