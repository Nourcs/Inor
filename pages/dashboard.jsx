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
import NewInvoice from '../components/Dashboard/Invoice';

function Dashboard() {
  return (
    <div className="p-5">
      <section className="flex flex-col-reverse lg:flex-row gap-5">
        <div className="w-full lg:w-2/3">
          <Summary sales={sales} purchases={purchases} inventory={inventory} />
        </div>
        <div className="w-full flex lg:w-1/3">
          <NewInvoice />
        </div>
      </section>
      <section className="flex flex-col-reverse lg:flex-row gap-5">
        <div className="w-full lg:w-2/3 flex flex-col">
          <Statistics data={chart} />
          <div className="lg:hidden">
            <Activity feed={feed} />
          </div>
          <Products products={products} />
        </div>
        <div className="hidden lg:block w-1/3">
          <Activity feed={feed} />
        </div>
      </section>
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
