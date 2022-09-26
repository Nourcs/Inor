import React, { useState } from 'react';

import { Search } from 'react-feather';
import StaffLayout from '../../components/Layouts/Staff';

import Table from '../../components/Table/Table';
import Modal from '../../components/Modal/Modal';
import Layout from '../../components/Layouts/Layout';

const DATA = [
  {
    team: 'Bar',
  },
  {
    team: 'Restaurant',
  },
];

const HEADINGS = [
  { label: 'Team', value: 'team' },
  { label: '', value: '' },
  { label: '', value: '' },
  { label: '', value: '' },
  { label: '', value: '' },
  { label: '', value: '' },
  { label: '', value: '' },

];

function Teams() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className="flex-1 flex flex-col justify-between overflow-hidden">
        <div className="p-5">
          <StaffLayout />
        </div>
        <Table initialData={DATA} headings={HEADINGS} search={search}>
          <div className="w-full max-w-lg border-2 border-dark-400 rounded-full flex items-center px-3 h-10">
            <div className="mr-3">
              <Search className="h-5 w-5 text-dark-600" />
            </div>
            <input
              type="text"
              className="w-full bg-transparent focus:outline-none pr-2 placeholder:text-dark-600 font-bold"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <button type="button" className="border-2 border-main-900 text-main-900 font-bold text-sm h-10 px-5 rounded-full mr-3 flex items-center justify-center hover:bg-main-900 hover:text-dark-100 transition duration-100 ease-in-out">
              Export All
            </button>
            <button
              onClick={() => setShowModal(!showModal)}
              type="button"
              className="text-dark-100 font-bold text-sm h-10 px-10 bg-main-900 rounded-full flex items-center justify-center"
            >
              Add Team
            </button>
          </div>
        </Table>
      </div>
      {showModal && (
      <Modal closeModal={() => setShowModal(false)} title="Add Category" />
      )}
    </>
  );
}

Teams.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Teams;
