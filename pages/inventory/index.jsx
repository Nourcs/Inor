import React from 'react';

function Home() {
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

export default Home;
