import React, { useEffect, useState } from 'react';
import {
  DollarSign, Info, List, Package, Plus, Trash2,
} from 'react-feather';

function AddProduct() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: 0,
    costPerItem: 0,
    tax: 0,
  });

  const [options, setOptions] = useState([]);

  useEffect(() => {
    const arr = [form.name || 'Name', form.category || 'Category', form.supplier || 'Supplier', form.warehouse || 'Warehouse', '00'].map((item) => `${item[0] || 'x'}${item[1] || 'x'}`);
    const sku = arr.join('').toUpperCase();
    setForm({ ...form, sku });
  }, [form.name, form.category, form.supplier, form.warehouse]);

  const handleOptions = () => {
    const newOptions = [...options];
    const option = {
      name: '',
      values: [''],
    };
    newOptions.push(option);
    setOptions(newOptions);
  };

  return (
    <div>
      <div className="p-5 flex items-center">
        <div className="w-1/3 flex items-center justify-center">
          <button type="button" className="h-28 w-28 md:h-36 md:w-36 bg-dark-200 rounded-full mr-5 relative group">
            <div className="h-10 w-10 bg-main-900 rounded-full flex items-center border-4 border-dark-100 justify-center text-dark-100 group-hover:bg-dark-900 transition duration-150 ease-in-out absolute -bottom-5 left-[52px]">
              <Plus
                className="h-5 w-5"
                strokeWidth={2.5}
              />
            </div>
          </button>
        </div>
        <div className="w-2/3">
          <label className="block">
            <span className="text-sm font-semibold block">Title</span>
            <input
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              value={form.name}
              type="text"
              placeholder="Name"
              className="mt-1 h-10 px-3 w-full text-dark-900 placeholder-dark-500 bg-transparent border border-dark-300 rounded-md disabled:cursor-not-allowed disabled:bg-dark-300 disabled:text-dark-600"
            />
          </label>
          <label className="block mt-3">
            <span className="text-sm font-semibold block">Description</span>
            <textarea
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              value={form.description}
              type="text"
              placeholder="Add Description"
              style={{ resize: 'none' }}
              rows={4}
              className="mt-1  p-3 w-full text-dark-900 placeholder-dark-500 bg-transparent border border-dark-300 rounded-md disabled:cursor-not-allowed disabled:bg-dark-300 disabled:text-dark-600"
            />
          </label>
        </div>
      </div>
      <hr />
      <div className="p-5">
        <h4 className="font-semibold text-lg flex items-center">
          <div className="mr-2 text-main-900">
            <DollarSign className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <span>Pricing</span>
        </h4>
        <div className="flex mt-5 gap-5">
          <label className="flex-1">
            <span className="text-sm font-semibold block">Price</span>
            <input
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              value={form.price}
              type="number"
              min={0}
              placeholder="Price"
              className="mt-1 h-10 px-3 w-full text-dark-900 placeholder-dark-500 bg-transparent border border-dark-300 rounded-md disabled:cursor-not-allowed disabled:bg-dark-300 disabled:text-dark-600"
            />
          </label>
          <label className="flex-1">
            <div className="flex items-center">
              <span className="text-sm font-semibold flex items-center mr-2">
                Cost Per Item
              </span>
              <div className="text-main-900">
                <Info className="h-5 w-5" />
              </div>
            </div>
            {' '}
            <input
              onChange={(e) => setForm({ ...form, costPerItem: e.target.value })}
              value={form.costPerItem}
              type="number"
              min={0}
              placeholder="Cost Per Item"
              className="mt-1 h-10 px-3 w-full text-dark-900 placeholder-dark-500 bg-transparent border border-dark-300 rounded-md disabled:cursor-not-allowed disabled:bg-dark-300 disabled:text-dark-600"
            />
          </label>
        </div>
        <div className="mt-5">
          <label className="flex-1">
            <div className="flex items-center">
              <span className="text-sm font-semibold flex items-center mr-2">
                Tax Percentage
              </span>
              <div className="text-main-900">
                <Info className="h-5 w-5" />
              </div>
            </div>
            <input
              onChange={(e) => setForm({ ...form, tax: e.target.value })}
              value={form.tax}
              type="number"
              min={0}
              placeholder="Text Percentage"
              className="mt-1 h-10 px-3 w-full text-dark-900 placeholder-dark-500 bg-transparent border border-dark-300 rounded-md disabled:cursor-not-allowed disabled:bg-dark-300 disabled:text-dark-600"
            />
          </label>
        </div>
      </div>
      <hr />
      <div className="p-5">
        <h4 className="font-semibold text-lg flex items-center">
          <div className="mr-3 text-main-900">
            <Package className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <span>Inventory</span>
        </h4>
        <div className="flex mt-5 gap-5">
          <label className="flex-1">
            <div className="flex items-center">
              <span className="text-sm font-semibold flex items-center mr-2">
                SKU
              </span>
              <div className="text-main-900">
                <Info className="h-5 w-5" />
              </div>
            </div>
            {' '}
            <input
              onChange={(e) => setForm({ ...form, sku: e.target.value })}
              value={form.sku}
              type="text"
              min={0}
              placeholder="SKU"
              className="mt-1 h-10 px-3 w-full text-dark-900 placeholder-dark-500 bg-transparent border border-dark-300 rounded-md disabled:cursor-not-allowed disabled:bg-dark-300 disabled:text-dark-600"
            />
          </label>
          <label className="flex-1">
            <div className="flex items-center">
              <span className="text-sm font-semibold flex items-center mr-2">
                Barcode
              </span>
              <div className="text-main-900">
                <Info className="h-5 w-5" />
              </div>
            </div>
            {' '}
            <input
              onChange={(e) => setForm({ ...form, costPerItem: e.target.value })}
              value={form.costPerItem}
              type="number"
              min={0}
              placeholder="Cost Per Item"
              className="mt-1 h-10 px-3 w-full text-dark-900 placeholder-dark-500 bg-transparent border border-dark-300 rounded-md disabled:cursor-not-allowed disabled:bg-dark-300 disabled:text-dark-600"
            />
          </label>
        </div>
      </div>
      <hr />
      <div className="p-5">
        <h4 className="font-semibold text-lg flex items-center">
          <div className="mr-3 text-main-900">
            <List className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <span>Variants</span>
        </h4>
        {options.map((option, optionIndex) => (
          <section className="mt-5 p-5 border rounded-md border-dark-300">
            <div>
              <span className="text-sm font-semibold flex items-center">
                Option Name
              </span>
              <div className="flex">
                <input
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[optionIndex].name = e.target.value;
                    setOptions(newOptions);
                  }}
                  value={option.name}
                  type="text"
                  placeholder="Size"
                  className="w-11/12 mt-1 h-10 px-3 text-dark-900 placeholder-dark-500 bg-transparent border border-dark-300 rounded-md disabled:cursor-not-allowed disabled:bg-dark-300 disabled:text-dark-600"
                />
                <button
                  onClick={() => {
                    const newOptions = [...options];
                    newOptions.splice(optionIndex, 1);
                    setOptions(newOptions);
                  }}
                  type="button"
                  className="w-1/12 ml-5 text-dark-400 hover:text-main-900 flex items-center justify-center"
                >
                  <div>
                    <Trash2 className="h-5 w-5" />
                  </div>
                </button>
              </div>
            </div>
            {option.values.map((val, valIndex) => {
              const nu = null;
              return (
                <div className="mt-5 ml-5">
                  <span className="text-sm font-semibold flex items-center">
                    Option Value
                  </span>
                  <div className="flex ml-5">
                    <input
                      onChange={(e) => {
                        const newOptions = [...options];
                        if (valIndex === option.values.length - 1 && val.length > 0) {
                          newOptions[optionIndex].values.push('');
                        }
                        if (e.target.value.length > 0) {
                          newOptions[optionIndex].values[valIndex] = e.target.value;
                        }
                        setOptions(newOptions);
                      }}
                      value={val}
                      type="text"
                      placeholder={(option.values.length < 2) || (valIndex === option.values.length - 1) ? 'Add New Value' : 'Size'}
                      className="w-11/12 mr-5 mt-1 h-10 px-3 text-dark-900 placeholder-dark-500 bg-transparent border border-dark-300 rounded-md disabled:cursor-not-allowed disabled:bg-dark-300 disabled:text-dark-600"
                    />
                    <button
                      onClick={() => {
                        const newOptions = [...options];
                        newOptions[optionIndex].values.splice(valIndex, 1);
                        setOptions(newOptions);
                      }}
                      type="button"
                      className={`w-1/12 text-dark-400 hover:text-main-900 flex items-center justify-center ${(option.values.length < 2) || (valIndex === option.values.length - 1) ? 'invisible' : 'visible'}`}
                    >
                      <div>
                        <Trash2 className="h-5 w-5" />
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
          </section>
        ))}
        <button
          onClick={() => handleOptions()}
          type="button"
          className="flex items-center text-main-900 hover:text-dark-100 hover:bg-main-900 mt-5 border-2 border-main-900 w-full h-10 justify-center rounded-md text-sm font-semibold transition duration-150 ease-in-out"
        >
          <div className="mr-3 -mt-0.5">
            <Plus className="h-5 w-5" />
          </div>
          <span>Add Option</span>
        </button>
      </div>
    </div>
  );
}

export default AddProduct;
