import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import {
  Check,
  ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Search,
} from 'react-feather';
import { range, isEmpty } from 'lodash';
import { CSVLink } from 'react-csv';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { Add } from '../../public/illustrations';

function Pages({ setPaging, paging }) {
  // Generate Pages
  const generatePages = () => {
    // const pagesArr = paging.pages > 5 ? (paging.page < 3 ? range(1, 4) : (paging.page > paging.pages - 3 ? range(paging.pages - 4, paging.pages - 1) : range(paging.page - 1, paging.page + 2))) : range(1, paging.pages);
    if (paging.pages > 5) {
      if (paging.page < 3) {
        return range(1, 4);
      } if (paging.page > paging.pages - 3) {
        return range(paging.pages - 4, paging.pages - 1);
      }
      return range(paging.page - 1, paging.page + 2);
    }
    return range(1, paging.pages);
  };

  const pagesArr = generatePages();

  return (
    <div className="hidden md:flex items-center flex-1 justify-center mr-3">
      <button
        type="button"
        className="mr-3 h-8 w-8 items-center justify-center font-semibold text-dark-300 hover:text-main-900 transition duration-150 ease-in-out flex"
        onClick={() => setPaging(
          { ...paging, page: paging.page > 0 ? paging.page - 1 : paging.page },
        )}
      >
        <div>
          <ChevronLeft />
        </div>
      </button>
      <div className="flex">
        <button
          onClick={() => setPaging({ ...paging, page: 0 })}
          type="button"
          className={`mr-3 ${paging.page === 0 ? 'bg-main-900' : 'bg-dark-200 hover:bg-main-900 '} transition duration-150 ease-in-out h-8 w-8 rounded-full text-white flex items-center justify-center text-xs font-semibold`}
        >
          1
        </button>
        {paging.pages > 5 && paging.page > 1 && (
        <span className="mr-3 text-dark-300">
          ...
        </span>
        )}
      </div>
      {pagesArr.map((item) => (
        <button
          onClick={() => setPaging({ ...paging, page: item })}
          type="button"
          className={`${paging.page === item ? 'bg-main-900' : 'bg-dark-200 hover:bg-main-900 '} transition duration-150 ease-in-out h-8 w-8 rounded-full text-white flex items-center justify-center text-xs font-semibold mr-3`}
        >
          {item + 1}
        </button>
      ))}
      {paging.pages > 5 && (
      <div className="flex">
        {paging.page < (paging.pages - 3) && (
        <span className="mr-3 text-dark-300">
          ...
        </span>
        )}
        <button
          onClick={() => setPaging({ ...paging, page: paging.pages - 1 })}
          type="button"
          className={`${paging.page === (paging.pages - 1) ? 'bg-main-900' : 'bg-dark-200 hover:bg-main-900 '} transition duration-150 ease-in-out h-8 w-8 rounded-full text-white flex items-center justify-center text-xs font-semibold mr-3`}
        >
          {paging.pages}
        </button>
      </div>
      )}
      <button
        type="button"
        className="font-semibold w-8 h-8  items-center justify-center text-dark-300 hover:text-main-900 transition duration-150 ease-in-out flex"
        onClick={() => setPaging({ ...paging, page: paging.page < paging.pages - 1 ? paging.page + 1 : paging.page })}
      >
        <div>
          <ChevronRight />
        </div>
      </button>
    </div>
  );
}

function Results({ paging }) {
  return (
    <div className="text-dark-500 flex-1 mr-3 text-ellipsis overflow-hidden whitespace-nowrap">
      Showing
      {' '}
      {(paging.page * paging.pageSize + 1)}
      -
      {paging.pageSize * (paging.page + 1) > paging.dataLength ? paging.dataLength : paging.pageSize * (paging.page + 1)}
      {' '}
      of
      {' '}
      {paging.dataLength}
      {' '}
      Results
    </div>
  );
}

function PageSize({ paging, setPaging }) {
  return (
    <div className="flex-1 hidden md:flex justify-end items-center">
      <span className="text-dark-500">
        Show
      </span>
      <select
        value={paging.pageSize}
        onChange={(e) => setPaging({ ...paging, pageSize: Number(e.target.value) })}
        className="bg-main-900 mx-2 w-12 py-1 rounded-full appearance-none text-center outline-none hover:bg-dark-900 text-white transition duration-150 ease-in-out cursor-pointer"
      >
        {paging.pageSizeOptions.map((item) => (
          <option value={item + 1}>
            {item === paging.dataLength - 1 ? 'All' : item + 1}
          </option>
        ))}
      </select>
      <span className="text-dark-500">
        Results
      </span>
    </div>
  );
}
function Table({
  data, columns, type, showPagination,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [search, setSearch] = useState('');

  // Paging
  const [paging, setPaging] = useState({
    page: 0,
    pages: Math.round(data.length / data.length),
    dataLength: data.length,
    pageSize: data.length,
    pageSizeOptions: [...Array(data.length).keys()]
      .filter((_, index) => (index + 1) % 5 === 0 || index === data.length),
  });

  // Sorting
  const [sort, setSort] = useState({
    sortBy: 'sku',
    type: 'initial',
  });

  const handleSorting = (e, sortBy) => {
    e.preventDefault();
    if (sort.sortBy === sortBy) {
      if (sort.type === 'initial') {
        setSort({ ...sort, type: 'ascending' });
      } else if (sort.type === 'ascending') {
        setSort({ ...sort, type: 'descending' });
      } else {
        setSort({ ...sort, type: 'initial' });
      }
    } else {
      setSort({ sortBy, type: 'ascending' });
    }
  };

  const sortedData = (a, b) => {
    if (sort.type === 'ascending') {
      if (a[sort.sortBy] < b[sort.sortBy]) {
        return -1;
      }
      if (a[sort.sortBy] > b[sort.sortBy]) {
        return 1;
      }
      return 0;
    } if (sort.type === 'descending') {
      if (a[sort.sortBy] > b[sort.sortBy]) {
        return -1;
      }
      if (a[sort.sortBy] < b[sort.sortBy]) {
        return 1;
      }
      return 0;
    }
    return 0;
  };

  // Select
  const [selected, setSelected] = useState({
    all: false,
    elements: [],
  });

  const handleSelection = (e, el) => {
    e.preventDefault();
    const arr = [...selected.elements];
    let all = false;
    const index = arr.findIndex((item) => item === el);
    if (index < 0) {
      arr.push(el);
      if (arr.length === data.length) {
        all = true;
      }
    } else {
      arr.splice(index, 1);
    }
    setSelected({ all, elements: arr });
  };

  // Handle Data
  const handleFilteredData = [...data]
    .filter((item) => {
      let valid = false;
      Object.keys(item).map((el) => {
        if (item[el].toLowerCase().includes(search.toLowerCase())) {
          valid = true;
        }
      });
      return valid;
    })
    .sort(sortedData)
    .slice((paging.page * paging.pageSize + 1) - 1, paging.pageSize * (paging.page + 1));

  const [filteredData, setFilteredData] = useState(handleFilteredData);

  // Updates
  useEffect(() => {
    setFilteredData(handleFilteredData);
    setPaging(
      {
        ...paging,
        page: paging.page >= Math.ceil(data.length / paging.pageSize) ? 0 : paging.page,
        pages: Math.ceil(data.length / paging.pageSize),
        dataLength: data.length,
        pageSizeOptions: [...Array(data.length).keys()]
          .filter((_, index) => (index + 1) % 5 === 0 || index === (data.length - 1)),
      },
    );
  }, [paging.pageSize, data, search]);

  useEffect(() => {
    setFilteredData(handleFilteredData);
  }, [paging.page, sort, search]);

  // CSV
  const generateCSV = () => {
    const csvHeaders = columns.map((item) => ({ label: item.title, key: item.key }));
    let csvData = [];
    if (!isEmpty(selected.elements) && !selected.all) {
      csvData = [...selected.elements];
    } else {
      csvData = [...data];
    }

    return ({ headers: csvHeaders, data: csvData });
  };

  // Window Resize
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return (_) => {
      window.removeEventListener('resize', handleResize);
    };
  });

  useEffect(() => {
    if (width < 768 && filteredData.length < data.length) {
      setPaging({ ...paging, pageSize: data.length });
    }
  }, [width, filteredData]);

  return (
    <>
      {/* Search  */}
      {showPagination && (
      <section className={`pb-5 flex items-center ${data.length > 0 ? 'justify-between' : 'justify-end'}`}>
        {data.length > 0 && (
        <div className="border-2 border-dark-300 h-10 rounded-full flex items-center relative flex-1 md:max-w-md mr-3">
          <div className="text-dark-400 absolute left-3">
            <Search className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search"
            className="placeholder:text-dark-400 outline-none font-semibold w-full h-full bg-transparent pl-10 pr-3"
          />
        </div>
        )}
        <div className={`flex items-center justify-end ${data.length === 0 && 'w-full'}`}>
          {data.length > 0 && (
          <CSVLink
            className="h-10 hidden sm:flex items-center mr-3 justify-center px-10 bg-white text-sm font-semibold text-main-900 rounded-full hover:bg-main-900 hover:text-white transition duration-150 ease-in-out border-2 border-main-900"
            onClick={() => enqueueSnackbar('CSV File Downloaded Successfully.', { variant: 'success', preventDuplicate: true })}
            data={generateCSV().data}
            headers={generateCSV().headers}
            filename={(`${type.key === 'product' && 'Products-'}${moment().format('MMM-DD-YYYY')}`).toLocaleLowerCase()}
          >
            Export
            {' '}
            {!isEmpty(selected.elements) && !selected.all ? 'Selected' : 'All'}
          </CSVLink>
          )}
          <button
            type="button"
            className={`shrink-0 h-10 px-10 bg-main-900 text-sm font-semibold text-white rounded-full hover:bg-dark-900 transition duration-150 ease-in-out border-2 border-main-900 hover:border-dark-900 ${data.length === 0 && 'w-full md:w-auto'}`}
          >
            {selected.elements.length === 1
              ? 'Duplicate' : 'Add'}
            {' '}
            <span className={`${data.length > 0 && 'hidden md:block'}`}>{type.label}</span>
          </button>
        </div>
      </section>
      )}
      {/* Table  */}
      <section
        className={`flex-1 overflow-auto flex ${showPagination && 'pb-5'}`}
      >
        <div className="bg-dark-100 rounded-md w-full overflow-auto">
          {data.length > 0 ? (
            <table className="table-fixed border-collapse w-full text-sm">
              <colgroup>
                {columns.map((item) => <col width={item.width} />)}
              </colgroup>
              <thead className="bg-main-900 text-left h-12 rounded-md sticky top-0 text-dark-100 z-10">
                <tr>
                  {columns.map((item) => (
                    <th
                      className={`${item.key === 'sku' ? 'sticky left-0 top-0 bg-main-900 z-20 pr-3' : 'px-3'}`}
                      id={item.key}
                    >
                      <div className="flex items-center">
                        {item.key === 'sku' && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setSelected({ elements: selected.all ? [] : [...data], all: !selected.all });
                          }}
                          type="button"
                          className="px-5 -mt-[1px] h-12 group"
                        >
                          <div
                            className={`h-[15px] w-[15px] border-2 flex items-center justify-center rounded-sm transition duration-150 ease-in-out ${selected.all ? 'bg-white border-white' : 'border-white border-opacity-30 group-hover:border-opacity-100'}`}
                          >
                            {selected.all && (
                            <div>
                              <Check className="text-main-900 h-3 w-3" strokeWidth={3} />
                            </div>
                            )}
                          </div>
                        </button>
                        )}
                        <button
                          type="button"
                          className="group h-12 w-full text-left flex items-center "
                          onClick={(e) => handleSorting(e, item.key)}
                        >
                          <span className="mr-5">
                            {item.title}
                          </span>
                          <div className="">
                            <div
                              className={`opacity-30 group-hover:opacity-100 transition duration-150 ease-in-out ${sort.sortBy === item.key && sort.type === 'descending' && 'invisible'} ${sort.sortBy === item.key && sort.type === 'ascending' && 'opacity-100'}`}
                            >
                              <ChevronUp className="h-3 w-3" strokeWidth={2.5} />
                            </div>
                            <div
                              className={`-mt-1 opacity-30 group-hover:opacity-100 transition duration-150 ease-in-out ${sort.sortBy === item.key && sort.type === 'ascending' && 'invisible'} ${sort.sortBy === item.key && sort.type === 'ascending' && 'opacity-100'}`}
                            >
                              <ChevronDown className="h-3 w-3" strokeWidth={2.5} />
                            </div>
                          </div>
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((item) => (
                  <Link href={`products/${item.sku}`}>
                    <tr className="border-b border-dark-200 hover:bg-dark-200 cursor-pointer group">
                      {Object.keys(item).map((el) => {
                        const searchIndex = item[el].toLowerCase().indexOf(search.toLowerCase());
                        const matchedSearch = (item[el].toLowerCase().includes(search.toLowerCase()) && search) ? [item[el].slice(0, searchIndex), item[el].slice(searchIndex, searchIndex + search.length), item[el].slice(searchIndex + search.length, item[el].length)].filter((i) => i.length > 0) : [item[el]];
                        return (
                          <td className={`h-14 ${el === 'sku' ? 'sticky left-0 bg-dark-100 group-hover:bg-dark-200 pr-3' : 'px-3'}`}>
                            <div className="flex items-center">
                              {el === 'sku' && (
                              <button
                                onClick={(e) => handleSelection(e, item)}
                                type="button"
                                className="px-5 -mt-[1px] h-14"
                              >
                                <div
                                  className={`h-[15px] w-[15px] border-2 flex items-center justify-center rounded-sm  transition duration-150 ease-in-out ${selected.elements.includes(item) ? 'bg-main-900 border-main-900' : 'border-dark-300 hover:border-main-900'}`}
                                >
                                  {selected.elements.includes(item) && (
                                  <div>
                                    <Check className="text-dark-100 h-3 w-3" strokeWidth={3} />
                                  </div>
                                  )}
                                </div>
                              </button>
                              )}
                              {matchedSearch.map((element) => {
                                const nu = null;
                                return (
                                  <span className={`whitespace-pre ${element.toLowerCase() === search.toLowerCase() && 'font-semibold text-main-900'}`}>{element}</span>
                                );
                              })}
                            </div>
                          </td>
                        );
                      })}
                    </tr>
                  </Link>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-5 h-full flex items-center justify-center">
              <div>
                <Add className="h-52" />
                <h6 className="mt-10">
                  You don't have any
                  {' '}
                  {type.keyP}
                  {' '}
                  yet.
                </h6>
              </div>
            </div>
          )}
        </div>
      </section>
      {/* Pagination */}
      {data.length > 0 && showPagination && (
      <section className="-mx-5 h-16 shrink-0 border-t border-dark-300 flex items-center px-5 justify-between text-sm">
        {(isEmpty(selected.elements)) ? (<Results paging={paging} />)
          : (
            <div className="flex-1 flex items-center">
              <button
                type="button"
                className="border-2 border-main-900 h-10 px-5 rounded-full text-sm font-semibold text-main-900 hover:bg-main-900 hover:text-white transition duration-150 ease-in-out"
              >
                Delete
                {' '}
                <span className="">{selected.all ? 'All' : 'Selected'}</span>
              </button>

            </div>
          )}
        {paging.pages > 1 && (<Pages paging={paging} setPaging={setPaging} />)}
        <PageSize paging={paging} setPaging={setPaging} />

      </section>
      )}
    </>
  );
}

export default Table;
