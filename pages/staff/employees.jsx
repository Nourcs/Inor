import React, { useState } from 'react';

import { ChevronDown, Plus, Search } from 'react-feather';
import { countries } from 'countries-list';
import Flags from 'country-flag-icons/react/3x2';
import OutsideClickHandler from 'react-outside-click-handler';
import StaffLayout from '../../components/Layouts/Staff';
import Table from '../../components/Table/Table';
import Modal from '../../components/Modal/Modal';
import Layout from '../../components/Layouts/Layout';

const DATA = [
  {
    name: 'Nour Cherif Essoussi', role: 'Admin', position: 'CEO', team: 'All', location: 'All',
  },
  {
    name: 'Arij Nada Zaiter', role: 'Employee', position: 'Bartender', team: 'Bar', location: 'Bar',
  },
  {
    name: 'Nour Rihane', role: 'Manager', position: 'Team Manager', team: 'Bar', location: 'Bar',
  },
  {
    name: 'Seif Cherif', role: 'Employee', position: 'Waiter', team: 'Bar', location: 'Bar',
  },
  {
    name: 'Nadia Senoussi', role: 'Employee', position: 'Waitress', team: 'Bar, Restaurant', location: 'Bar, Restaurant',
  },
];

const HEADINGS = [
  { label: 'Name / Phone', value: 'name' },
  { label: 'Role', value: 'role' },
  { label: 'Position', value: 'position' },
  { label: 'Team', value: 'team' },
  { label: 'Location', value: 'location' },
  // { label: '', value: '' },
  // { label: '', value: '' },

];

function Employees() {
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [countriesMenu, setCountriesMenu] = useState(false);
  const options = Object.keys(countries).map((item) => ({ label: countries[item].name, value: item, phone: countries[item].phone }));

  const [selectedCountry, setSelectedCountry] = useState(options.find((item) => item.value === 'TN'));

  const Flag = Flags[selectedCountry.value];

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
              Add Employee
            </button>
          </div>
        </Table>
      </div>
      {showModal && (
      <Modal closeModal={() => setShowModal(false)} title="Add Employee">
        <div className="flex items-center">
          <div className="mr-5 h-28 w-28 rounded-full bg-dark-400 flex items-center justify-center text-dark-700 font-black text-lg relative">
            <span>JD</span>
            <button type="button" className="absolute text-dark-100 flex items-center justify-center bg-main-900 h-6 w-6 rounded-full outline outline-[3px] outline-dark-100 -bottom-2">
              <div>
                <Plus className="h-4 w-4" strokeWidth={3} />
              </div>
            </button>
          </div>
          <div className="flex-1">
            <div className="flex gap-5">
              <div className="flex-1 flex flex-col">
                <span className="text-sm font-semibold">First Name</span>
                <input type="text" placeholder="John" className="bg-transparent focus:outline-none border border-dark-400 rounded-md h-10 px-3" />
              </div>
              <div className="flex-1 flex flex-col">
                <span className="text-sm font-semibold">Last Name</span>
                <input type="text" placeholder="Doe" className="bg-transparent focus:outline-none border border-dark-400 rounded-md h-10 px-3" />
              </div>
            </div>
            <div className="flex gap-5 mt-3">
              <div className="flex-1 flex flex-col">
                <span className="text-sm font-semibold">Position</span>
                <input type="text" placeholder="Bartender" className="bg-transparent focus:outline-none border border-dark-400 rounded-md h-10 px-3" />
              </div>
              <div className="flex-1 flex flex-col">
                <span className="text-sm font-semibold">Role</span>
                <input type="text" placeholder="Team Manager" className="bg-transparent focus:outline-none border border-dark-400 rounded-md h-10 px-3" />
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-5 border-dark-400" />
        <div className="mt-3">
          <h2 className="font-bold text-lg text-main-900">Contact</h2>
          <div className="flex-1 mt-3">
            <div className="flex gap-5">
              <div className="flex-1 flex flex-col">
                <span className="text-sm font-semibold">Email</span>
                <input type="email" placeholder="info@inor.com" className="bg-transparent focus:outline-none border border-dark-400 rounded-md h-10 px-3" />
              </div>
              <div className="flex-1 flex flex-col" id="phone_number">
                <span className="text-sm font-semibold">Phone Number</span>
                <div className=" border border-dark-400 rounded-md h-10 px-3 flex items-center relative">
                  <span className="mr-2 font-semibold">
                    +
                    {selectedCountry.phone}
                  </span>
                  <input type="text" placeholder="22 226 032" className="flex-1 bg-transparent focus:outline-none mr-2" />
                  <button
                    type="button"
                    className="flex items-center focus:outline-none group"
                    onClick={() => setCountriesMenu(!countriesMenu)}
                  >
                    <div className="mr-2">
                      <Flag className="h-6" />
                    </div>
                    <div className="text-dark-600 group-hover:text-dark-900 transition duration-100 ease-in-out">
                      <ChevronDown className="h-5 w-5" />
                    </div>
                  </button>
                  {countriesMenu && (
                  <OutsideClickHandler
                    display="flex"
                    onOutsideClick={() => {
                      setCountriesMenu(false);
                    }}
                  >
                    <div
                      className="w-full absolute bg-dark-100 right-0 bottom-16 rounded-md max-h-48 overflow-y-auto"
                      style={{ boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.2)' }}
                    >
                      {options.map((item) => {
                        const Flag = Flags[item.value];
                        return (
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedCountry(item);
                              setCountriesMenu(false);
                            }}
                            className={`w-full flex items-center px-5 py-3 border-dark-400 ${item.value === selectedCountry.value ? 'bg-main-900 text-dark-100' : 'hover:bg-dark-300 border-b'}`}
                          >
                            <div className="mr-3">
                              <Flag className="h-5" />
                            </div>
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </OutsideClickHandler>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-5 border-dark-400" />
        <div className="mt-3">
          <h2 className="font-bold text-lg text-main-900">Details</h2>
          <div className="flex-1 mt-3">
            <div className="flex gap-5">
              <div className="flex-1 flex flex-col">
                <span className="text-sm font-semibold">Locations</span>
                <input type="text" placeholder="Select Locations" className="bg-transparent focus:outline-none border border-dark-400 rounded-md h-10 px-3" />
              </div>
              <div className="flex-1 flex flex-col">
                <span className="text-sm font-semibold">Teams</span>
                <input type="text" placeholder="Select Teams" className="bg-transparent focus:outline-none border border-dark-400 rounded-md h-10 px-3" />
              </div>
            </div>
          </div>
        </div>
      </Modal>
      )}
    </>

  );
}

Employees.getLayout = function getLayout(page) {
  return (
    <Layout>
      {page}
    </Layout>
  );
};

export default Employees;
