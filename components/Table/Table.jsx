import React, {
  useCallback, useEffect, useRef, useState,
} from 'react';
import Select from 'react-select';
import {
  Check, Maximize2, ChevronUp, ChevronDown,
} from 'react-feather';

function TableHeader({
  headings, selectAll, setSelectAll, sortBy, setSortBy,
}) {
  const handleSorting = (label) => {
    if (sortBy.label === label) {
      if (sortBy.ascending) {
        setSortBy({ label, ascending: !sortBy.ascending });
      } else {
        setSortBy({ label: '', ascending: true });
      }
    } else {
      setSortBy({ label, ascending: true });
    }
  };

  return (
    <section className="px-5">
      <div className="flex w-full justify-between mt-5 bg-dark-300 p-3 pr-8 rounded-md">
        {headings.map((item, index) => (
          <div className="flex-1 flex items-center">
            {index === 0 && (
            <button
              type="button"
              className={`h-4 w-4 border-2 rounded mr-3 flex items-center -mt-0.5 justify-center ${selectAll ? 'border-orange-900 bg-orange-900' : 'border-dark-600 hover:border-dark-700'}`}
              onClick={() => setSelectAll(!selectAll)}
            >
              {selectAll && (
              <div>
                <Check className="h-3 w-3 text-dark-100" strokeWidth={3} />
              </div>
              )}
            </button>
            )}
            <button type="button" className="flex items-center group" onClick={() => handleSorting(item.value)}>
              <span className="text-sm font-bold">
                {item.label}
              </span>
              <div className="flex flex-col ml-3 text-dark-600 group-hover:text-dark-900 transition duration-100 ease-in-out">
                <div className={`${sortBy.label === item.value && !sortBy.ascending && 'text-transparent'}`}>
                  <ChevronUp className="h-3 w-3" strokeWidth={2.5} />
                </div>
                <div className={`-mt-1 ${sortBy.label === item.value && sortBy.ascending && 'text-transparent'}`}>
                  <ChevronDown className="h-3 w-3" strokeWidth={2.5} />
                </div>
              </div>
            </button>
          </div>
        ))}
        <div className="w-10 text-sm font-bold" />
      </div>
    </section>
  );
}

function Table({
  initialData, headings, children, search,
}) {
  const [data, setData] = useState([...initialData]);

  // Table
  const [scrollable, setScrollable] = useState(false);
  const tableRef = useRef(null);

  // Table Pagination
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [numberOfPages, setNumberOfPages] = useState(Math.ceil(data.length / rowsPerPage));
  const [page, setPage] = useState(0);

  // Table Pagination Options
  const options = data.map((item, index) => ({ value: index + 1, label: index + 1 }));
  options.unshift({ label: 'All', value: data.length });

  // Table Sorting
  const [sortBy, setSortBy] = useState({ label: '', ascending: true });

  // Table Data
  const [tableData, setTableData] = useState([...data].slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage));

  // Update Sorting
  const handleSorting = () => {
    if (sortBy.label) {
      if (sortBy.ascending) {
        setTableData([...data]
          .sort((a, b) => {
            if (a[sortBy.label] < b[sortBy.label]) {
              return -1;
            } if (a[sortBy.label] > b[sortBy.label]) {
              return 1;
            }
            return 0;
          })
          .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage));
      } else {
        setTableData([...data]
          .sort((a, b) => {
            if (a[sortBy.label] > b[sortBy.label]) {
              return -1;
            } if (a[sortBy.label] < b[sortBy.label]) {
              return 1;
            }
            return 0;
          })
          .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage));
      }
    } else {
      setTableData([...data].slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage));
    }
  };

  // Table Selection
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelection = (id) => {
    const newArr = [...selectedRows];
    if (selectedRows.includes(id)) {
      newArr.splice(selectedRows.findIndex((item) => item === id), 1);
    } else {
      newArr.push(id);
    }
    setSelectedRows(newArr);
  };

  useEffect(() => {
    setSelectedRows([]);
  }, [selectAll]);

  // Update current page and number of pages when rowsPerPage is updated
  useEffect(() => {
    setPage(0);
    setNumberOfPages(Math.ceil([...data].length / rowsPerPage));
  }, [rowsPerPage, data]);

  // Handle Search
  useEffect(() => {
    const newData = [...initialData].filter((item) => {
      const valid = Object
        .values(item)
        .some((val) => val.toString().toLowerCase().includes(search.toLowerCase()));
      if (valid) return item;
    });

    setData([...newData]);
  }, [search]);

  // Update tableData when page and/or rowsPerPage are updated
  useEffect(() => {
    handleSorting();
  }, [page, rowsPerPage, sortBy, data]);

  // Update table scroll when needed
  useEffect(() => {
    setScrollable(tableRef.scrollHeight === tableRef.clientHeight);
  }, [tableRef]);

  // Next Page
  const nextPage = () => {
    if (page < numberOfPages - 1) {
      setPage(page + 1);
    }
  };

  // Previous Page
  const previousPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-5">
        {children}
      </div>
      {/* Table Header */}
      <TableHeader
        headings={headings}
        selectAll={selectAll}
        setSelectAll={setSelectAll}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <div className="px-5 flex-1 overflow-y-auto" ref={tableRef}>
        {data.length > 0 && (
          <>
            {tableData.map((item) => (
              <div className={`flex items-center w-full justify-between mt-2 p-3 border-b border-dark-400 ${scrollable ? 'pr-8' : ''}`}>
                <div className="flex-1 flex items-center">
                  <button
                    type="button"
                    className={`h-4 w-4 -mt-0.5 border-2 rounded mr-3 flex items-center justify-center ${selectAll || selectedRows.includes(item.sku) ? 'border-orange-900 bg-orange-900' : 'border-dark-600 hover:border-dark-700'}`}
                    onClick={() => handleRowSelection(item.sku)}
                  >
                    {(selectAll || selectedRows.includes(item.sku)) && (
                      <div>
                        <Check className="h-3 w-3 text-dark-100" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                  <span>
                    {search
                      ? item.sku.toString().replace(search, `/${search}/`).split('/').map((el) => (
                        <span className={`${el === search && 'font-bold'}`}>
                          {el}
                        </span>
                      ))
                      : item.sku}
                  </span>
                </div>
                <div className="flex-1">
                  {search
                    ? item.name.toString().replace(search, `/${search}/`).split('/').map((el) => (
                      <span className={`${el === search && 'font-bold'}`}>
                        {el}
                      </span>
                    ))
                    : item.name}
                </div>
                <div className="flex-1">
                  {search
                    ? item.category.toString().replace(search, `/${search}/`).split('/').map((el) => (
                      <span className={`${el === search && 'font-bold'}`}>
                        {el}
                      </span>
                    ))
                    : item.category}
                </div>
                <div className="flex-1">
                  {search
                    ? item.supplier.toString().replace(search, `/${search}/`).split('/').map((el) => (
                      <span className={`${el === search && 'font-bold'}`}>
                        {el}
                      </span>
                    ))
                    : item.supplier}
                </div>
                <div className="flex-1">
                  {search
                    ? item.quantity.toString().replace(search, `/${search}/`).split('/').map((el) => (
                      <span className={`${el === search && 'font-bold'}`}>
                        {el}
                      </span>
                    ))
                    : item.quantity}
                </div>
                <div className="flex-1">
                  {search
                    ? item.price.toString().replace(search, `/${search}/`).split('/').map((el) => (
                      <span className={`${el === search && 'font-bold'}`}>
                        {el}
                      </span>
                    ))
                    : item.price}
                </div>
                <div className="flex-1">
                  {search
                    ? item.sales.toString().replace(search, `/${search}/`).split('/').map((el) => (
                      <span className={`${el === search && 'font-bold'}`}>
                        {el}
                      </span>
                    ))
                    : item.sales}
                </div>
                <div className="w-10 flex items-center justify-end">
                  <button type="button" className="transition duration-100 ease-in-out text-dark-600 hover:text-orange-900">
                    <div><Maximize2 className="h-5 w-5" /></div>
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
        {(search.length > 0 && initialData.length > 0 && data.length === 0) && (
          <div className="flex items-center flex-col justify-center h-full">
            <img src="/void.svg" className=" h-40" />
            <div className="mt-5 font-bold text-sm">
              No results found.
            </div>
          </div>
        )}
        {initialData.length === 0 && (
          <div className="flex items-center flex-col justify-center h-full">
            <img src="/add.svg" className=" h-40" />
            <div className="mt-5 font-bold text-sm text-center">
              You don't have any products.
            </div>
            {/* <span className="text-lg font-bold max-w-sm text-center"></span> */}
            <button type="button" className="mt-3 text-dark-100 font-bold text-sm h-10 px-10 bg-orange-900 rounded-full flex items-center justify-center">
              Add Product
            </button>
          </div>
        )}
      </div>
      {data.length > 0 && (
      <div className="h-16 border-t border-dark-400 shadow-lg flex items-center justify-between px-5" style={{ boxShadow: '0px -5px 8px 0px rgba(0,0,0,0.08)' }}>
        <div className="flex-1">
          Showing
          {' '}
          <span className="font-semibold">{page * rowsPerPage + 1}</span>
          {' '}
          -
          {' '}
          <span className="font-semibold">{rowsPerPage * (page + 1) > data.length ? data.length : rowsPerPage * (page + 1)}</span>
          {' '}
          of
          {' '}
          <span className="font-semibold">{data.length}</span>
          {' '}
          results
        </div>
        <div className="flex items-center flex-1 justify-center">
          <button
            type="button"
            className={`mr-5 text-dark-600  transition duration-100 ease-in-out text-sm font-bold ${page === 0 ? '' : 'hover:text-orange-900'}`}
            onClick={previousPage}
          >
            Previous
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(0)}
              type="button"
              className={`text-dark-100 rounded-full h-5 w-5 flex items-center justify-center font-bold text-xs ${page === 0 ? 'bg-orange-900' : 'bg-dark-500'}`}
            >
              1
            </button>
            {numberOfPages > 4 && page > 1 && (<div>...</div>)}
            {numberOfPages === 3 && (
            <button
              onClick={() => setPage(1)}
              type="button"
              className={`text-dark-100 rounded-full h-5 w-5 flex items-center justify-center font-bold text-xs ${page === 1 ? 'bg-orange-900' : 'bg-dark-500'}`}
            >
              2
            </button>
            )}
            {numberOfPages > 3 && (
            <>
              <button
                onClick={() => setPage((page === 0 ? page + 2 : (page === numberOfPages - 2 ? page : (page === numberOfPages - 1 ? page - 1 : page + 1))) - 1)}
                type="button"
                className={`text-dark-100 rounded-full h-5 w-5 flex items-center justify-center font-bold text-xs ${page + 1 === (page === 0 ? page + 2 : (page === numberOfPages - 2 ? page : (page === numberOfPages - 1 ? page - 1 : page + 1))) ? 'bg-orange-900' : 'bg-dark-500'}`}
              >
                {page === 0 ? page + 2 : (page === numberOfPages - 2 ? page : (page === numberOfPages - 1 ? page - 1 : page + 1)) }
              </button>

              <button
                onClick={() => setPage((page === 0 ? page + 3 : (page === numberOfPages - 3 || page === numberOfPages - 2 || page === numberOfPages - 1 ? numberOfPages - 1 : page + 2)) - 1)}
                type="button"
                className={`text-dark-100 rounded-full h-5 w-5 flex items-center justify-center font-bold text-xs ${page + 1 === (page === 0 ? page + 3 : (page === numberOfPages - 3 || page === numberOfPages - 2 || page === numberOfPages - 1 ? numberOfPages - 1 : page + 2)) && 'A' ? 'bg-orange-900' : 'bg-dark-500'}`}
              >
                {page === 0 ? page + 3 : (page === numberOfPages - 3 || page === numberOfPages - 2 || page === numberOfPages - 1 ? numberOfPages - 1 : page + 2)}
              </button>
            </>
            )}

            {numberOfPages > 4 && page < numberOfPages - 3 && (<div>...</div>)}
            {numberOfPages > 1 && (
            <button
              onClick={() => setPage(numberOfPages - 1)}
              type="button"
              className={`text-dark-100 rounded-full h-5 w-5 flex items-center justify-center font-bold text-xs ${page === numberOfPages - 1 ? 'bg-orange-900' : 'bg-dark-500'}`}
            >
              {numberOfPages}
            </button>
            )}
          </div>

          <button
            type="button"
            className={`ml-5 text-dark-600 transition duration-100 ease-in-out text-sm font-bold ${page === numberOfPages - 1 ? '' : 'hover:text-orange-900'}`}
            onClick={nextPage}
          >
            Next
          </button>
        </div>
        <div className="flex items-center flex-1 justify-end">
          Show :
          <Select
            options={options}
            menuPlacement="top"
            className="mx-2"
            value={{ label: rowsPerPage, value: rowsPerPage }}
            onChange={(e) => setRowsPerPage(e.value)}
          />
          results
        </div>
      </div>
      )}
    </>
  );
}

export default Table;
