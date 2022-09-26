import React from 'react';
import Layout from '../../components/Layouts/Layout';

function Index() {
  return null;
}

export async function getServerSideProps() {
  return {
    redirect: {
      destination: '/staff/employees',
      permanent: false,
    },
  };
}

Index.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Index;
