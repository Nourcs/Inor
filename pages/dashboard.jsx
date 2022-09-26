/* eslint-disable react/no-array-index-key */
import React from 'react';
import {
  sales, purchases, chart, feed, products, inventory,
} from '../constants/constants';
import Layout from '../components/Layouts/Layout';
import Summary from '../components/Dashboard/Summary';
import Statistics from '../components/Dashboard/Statistics';
import Activity from '../components/Dashboard/Activity';
import Products from '../components/Dashboard/Products';
import Inventory from '../components/Dashboard/Inventory';

function Dashboard() {
  return (
    <div className="p-5">
      <div className="flex gap-5">
        <section className="w-2/3">
          <Summary sales={sales} purchases={purchases} />
          <Statistics data={chart} />
        </section>
        <section className="flex-1">
          <Activity feed={feed} />
        </section>
      </div>
      <div className="flex mt-10 gap-5">
        <Products products={products} />
        <Inventory inventory={inventory} />
      </div>
    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Dashboard;
