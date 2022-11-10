import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import {
  Check,
  ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Grid, Minus, Search,
} from 'react-feather';
import { range, isEmpty } from 'lodash';
import { CSVLink } from 'react-csv';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { Add, Void } from '../../public/illustrations';
import Columns from '../Modal/Columns';

// Pages Navigation
function PagesNavigation({
  setPagination,
  pagination,
  pagination: { totalPages, pageIndex },
}) {
  // Generate Pages
  const generatePages = () => {
    if (totalPages > 5) {
      if (pageIndex < 3) {
        return range(1, 4);
      } if (pageIndex > totalPages - 3) {
        return range(totalPages - 4, totalPages - 1);
      }
      return range(pageIndex - 1, pageIndex + 2);
    }
    return range(1, totalPages);
  };

  const pagesArr = generatePages();

  return (
    <div className="hidden md:flex items-center flex-1 justify-center mr-3">
      <button
        type="button"
        className="mr-3 h-8 w-8 items-center justify-center font-semibold text-dark-300 hover:text-main-900 transition duration-150 ease-in-out flex"
        onClick={() => setPagination(
          { ...pagination, pageIndex: pageIndex > 0 ? pageIndex - 1 : pageIndex },
        )}
      >
        <div>
          <ChevronLeft />
        </div>
      </button>
      <div className="flex">
        <button
          onClick={() => setPagination({ ...pagination, pageIndex: 0 })}
          type="button"
          className={`mr-3 ${pageIndex === 0 ? 'bg-main-900' : 'bg-dark-200 hover:bg-main-900 '} transition duration-150 ease-in-out h-8 w-8 rounded-full text-white flex items-center justify-center text-xs font-semibold`}
        >
          1
        </button>
        {totalPages > 5 && pageIndex > 1 && (
        <span className="mr-3 text-dark-300">
          ...
        </span>
        )}
      </div>
      {pagesArr.map((item) => (
        <button
          onClick={() => setPagination({ ...pagination, pageIndex: item })}
          type="button"
          className={`${pageIndex === item ? 'bg-main-900' : 'bg-dark-200 hover:bg-main-900 '} transition duration-150 ease-in-out h-8 w-8 rounded-full text-white flex items-center justify-center text-xs font-semibold mr-3`}
        >
          {item + 1}
        </button>
      ))}
      {totalPages > 5 && (
      <div className="flex">
        {pageIndex < (totalPages - 3) && (
        <span className="mr-3 text-dark-300">
          ...
        </span>
        )}
        <button
          onClick={() => setPagination({ ...pagination, pageIndex: totalPages - 1 })}
          type="button"
          className={`${pageIndex === (totalPages - 1) ? 'bg-main-900' : 'bg-dark-200 hover:bg-main-900 '} transition duration-150 ease-in-out h-8 w-8 rounded-full text-white flex items-center justify-center text-xs font-semibold mr-3`}
        >
          {totalPages}
        </button>
      </div>
      )}
      <button
        type="button"
        className="font-semibold w-8 h-8  items-center justify-center text-dark-300 hover:text-main-900 transition duration-150 ease-in-out flex"
        onClick={() => setPagination({ ...pagination, pageIndex: pageIndex < totalPages - 1 ? pageIndex + 1 : pageIndex })}
      >
        <div>
          <ChevronRight />
        </div>
      </button>
    </div>
  );
}

// Results
function ShowedResults({ pagination }) {
  return (
    <div className="text-dark-500 flex-1 mr-3 text-ellipsis overflow-hidden whitespace-nowrap">
      Showing
      {pagination.dataLength > 0 ? (
        <>
          {' '}
          {(pagination.pageIndex * pagination.pageSize + 1)}
          -
          {pagination.pageSize * (pagination.pageIndex + 1) > pagination.dataLength ? pagination.dataLength : pagination.pageSize * (pagination.pageIndex + 1)}
          {' '}
          of
          {' '}
          {pagination.dataLength}
          {' '}
        </>
      ) : ' 0 '}
      Results
    </div>
  );
}

// Page Size Component
function PageSizeButton({ pagination, setPagination }) {
  if (pagination.dataLength > 0) {
    return (
      <div className="flex-1 hidden md:flex justify-end items-center">
        <span className="text-dark-500">
          Show
        </span>
        <select
          value={pagination.pageSize}
          onChange={(e) => setPagination({ ...pagination, pageSize: Number(e.target.value) })}
          className="bg-main-900 mx-2 w-12 py-1 rounded-full appearance-none text-center outline-none hover:bg-dark-900 text-white transition duration-150 ease-in-out cursor-pointer"
        >
          {pagination.pageSizeOptions.map((item) => (
            <option value={item + 1}>
              {item === pagination.dataLength - 1 ? 'All' : item + 1}
            </option>
          ))}
        </select>
        <span className="text-dark-500">
          Results
        </span>
      </div>
    );
  }
  return null;
}

// Table Component
function Table({
  data: initialData = [],
  columns: initialColumns = [],
  dataType,
  pagination: showPagination,
  customColumns,
  selection: showSelection,
  sticky: isSticky,
  sort: showSort,
  search: showSearch,
  showModal,
}) {
  const { enqueueSnackbar } = useSnackbar();

  // Columns
  const [columns, setColumns] = useState(initialColumns.map((item) => ({ ...item, hidden: false })));

  // Search
  const [search, setSearch] = useState('');

  const matchSearch = () => (
    [...initialData].filter((item) => {
      const valid = false;
      Object.keys(item).map((el) => {
        let element = item[el];
        if (typeof item[el] === 'number') {
          element = element.toString();
        }
        if (element.toLowerCase().includes(search.toLowerCase())) {
          valid = true;
        }
      });
      return valid;
    })
  );

  const [searchedData, setSearchedData] = useState(matchSearch());

  // Paging
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    totalPages: Math.round(searchedData.length / searchedData.length),
    dataLength: searchedData.length,
    pageSize: searchedData.length,
    pageSizeOptions: [...Array(searchedData.length).keys()]
      .filter((_, index) => (index + 1) % 5 === 0 || index === (searchedData.length - 1)),
  });

  // Sorting
  const [sort, setSort] = useState({
    sortBy: 'sku',
    type: 'initial',
  });

  // Select
  const [selected, setSelected] = useState({
    all: false,
    elements: [],
  });

  // Handle Sorting
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

  // Filtered Data
  const handleFilteredData = [...searchedData]
    .sort(sortedData)
    .slice((pagination.pageIndex * pagination.pageSize + 1) - 1, pagination.pageSize * (pagination.pageIndex + 1));

  const [filteredData, setFilteredData] = useState(handleFilteredData);

  // Select
  const handleSelection = (e, el) => {
    e.preventDefault();
    const arr = [...selected.elements];
    let all = false;
    const index = arr.findIndex((item) => item === el);
    if (index < 0) {
      arr.push(el);
      if (arr.length === searchedData.length) {
        all = true;
      }
    } else {
      arr.splice(index, 1);
    }
    setSelected({ all, elements: arr });
  };

  // Updates
  useEffect(() => {
    setFilteredData(handleFilteredData);
    setPagination(
      {
        ...pagination,
        pageIndex: pagination.pageIndex >= Math.ceil(searchedData.length / pagination.pageSize) ? 0 : pagination.pageIndex,
        totalPages: Math.ceil(searchedData.length / pagination.pageSize),
        dataLength: searchedData.length,
        pageSizeOptions: [...Array(searchedData.length).keys()]
          .filter((_, index) => (index + 1) % 5 === 0 || index === (searchedData.length - 1)),
      },
    );
  }, [pagination.pageSize, searchedData]);

  useEffect(() => {
    setFilteredData(handleFilteredData);
  }, [pagination.pageIndex, sort]);

  // CSV
  const generateCSV = () => {
    const csvHeaders = columns.map((item) => ({ label: item.label, key: item.key }));
    let csvData = [];
    if (!isEmpty(selected.elements) && !selected.all) {
      csvData = [...selected.elements];
    } else {
      csvData = [...searchedData];
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
    if (width < 768 && filteredData.length < searchedData.length) {
      setPagination({ ...pagination, pageSize: searchedData.length });
    }
  }, [width, filteredData]);

  useEffect(() => {
    setSearchedData(matchSearch());
  }, [search]);

  const filteredColumns = columns.filter((item) => !item.hidden);

  return (
    <>
      {/* Search  */}
      {initialData.length > 0 && showPagination && (
      <section className={`pb-5 flex items-center  ${showSearch ? 'justify-between' : 'justify-end'}`}>
        {showSearch && (
        <div className="border-2 border-dark-300 h-10 rounded-md flex items-center relative flex-1 md:max-w-md mr-3">
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
        <div className="flex items-center justify-end">
          <Columns
            columns={columns}
            setColumns={setColumns}
            filteredColumns={filteredColumns}
          />
          <div className="hidden sm:flex">
            <CSVLink
              className="h-10 flex items-center mr-3 justify-center px-10 bg-white text-sm font-semibold text-main-900 rounded-md hover:bg-main-900 hover:text-white transition duration-150 ease-in-out border-2 border-main-900"
              onClick={() => enqueueSnackbar('CSV File Downloaded Successfully.', { variant: 'success', preventDuplicate: true })}
              data={generateCSV().data}
              headers={generateCSV().headers}
              filename={(`${dataType.key.p}-${moment().format('MMM-DD-YYYY')}`).toLocaleLowerCase()}
            >
              Export
              {' '}
              {!isEmpty(selected.elements) && !selected.all ? 'Selected' : 'All'}
            </CSVLink>
            <button
              onClick={showModal}
              type="button"
              className="shrink-0 h-10 px-10 bg-main-900 text-sm font-semibold text-white rounded-md hover:bg-dark-900 transition duration-150 ease-in-out border-2 border-main-900 hover:border-dark-900"
            >
              {selected.elements.length === 1
                ? 'Duplicate' : 'Add'}
              {' '}
              {dataType && dataType.label && dataType.label.s ? dataType.label.s : 'New'}
            </button>
          </div>
        </div>
      </section>
      )}
      {/* Table  */}
      <section
        className="flex-1 overflow-auto flex pb-5"
      >
        <div className="bg-dark-100 rounded-md w-full overflow-auto">
          {initialData.length > 0 && filteredColumns.length > 0 && (
            <table className="table-fixed border-collapse w-full text-sm">
              <colgroup>
                {showSelection && <col width={50} />}
                {filteredColumns.map((item) => <col width={filteredColumns.length < 5 ? 'auto' : '150'} />)}
              </colgroup>
              <thead className="bg-main-900 text-left h-12 rounded-md sticky top-0 text-dark-100 z-10">
                <tr>
                  {showSelection && (
                  <th className="bg-main-900 sticky left-0 z-20">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (selected.all || (!selected.all && selected.elements.length > 0)) {
                          setSelected({ elements: [], all: false });
                        } else {
                          setSelected({ elements: [...initialData], all: true });
                        }
                      }}
                      type="button"
                      className="-mt-[1px] group w-full h-12 flex items-center justify-center"
                    >
                      <div
                        className={`h-[15px] w-[15px] border-2 flex items-center justify-center rounded-sm transition duration-150 ease-in-out ${selected.all || selected.elements.length > 0 ? 'bg-white border-white' : 'border-white border-opacity-30 group-hover:border-opacity-100'}`}
                      >
                        {selected.all && (
                        <div>
                          <Check className="text-main-900 h-3 w-3" strokeWidth={3} />
                        </div>
                        )}
                        {!selected.all && selected.elements.length > 0 && (
                        <div>
                          <Minus className="text-main-900 h-3 w-3" strokeWidth={3} />
                        </div>
                        )}
                      </div>
                    </button>
                  </th>
                  )}
                  {filteredColumns.map((item) => (
                    <th
                      className={`px-3 ${showSelection && 'pl-0'} ${item.key === isSticky && `sticky ${showSelection ? 'left-[50px]' : 'left-0'} top-0 bg-main-900 z-20`}`}
                      id={item.key}
                    >
                      <div className="flex items-center">
                        <button
                          type="button"
                          className={`group h-12 w-full text-left flex items-center ${!showSort && 'cursor-default'}`}
                          onClick={(e) => showSort && handleSorting(e, item.key)}
                        >
                          <span className="mr-5">
                            {item.label}
                          </span>
                          {showSort && (
                          <div>
                            <div
                              className={`group-hover:opacity-100 transition duration-150 ease-in-out ${sort.sortBy === item.key && sort.type === 'descending' && 'invisible'} ${sort.sortBy === item.key && sort.type === 'ascending' ? 'opacity-100' : 'opacity-30'}`}
                            >
                              <ChevronUp className="h-3 w-3" strokeWidth={2.5} />
                            </div>
                            <div
                              className={`-mt-1 group-hover:opacity-100 transition duration-150 ease-in-out ${sort.sortBy === item.key && sort.type === 'ascending' && 'invisible'} ${sort.sortBy === item.key && sort.type === 'descending' ? 'opacity-100' : 'opacity-30'}`}
                            >
                              <ChevronDown className="h-3 w-3" strokeWidth={2.5} />
                            </div>
                          </div>
                          )}
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              {filteredData.length > 0 && (
              <tbody>
                {filteredData.map((item) => (
                  <Link href={`${dataType.key.p}/${item.id}`}>
                    <tr className="border-b border-dark-200 last:border-none hover:bg-dark-200 cursor-pointer group">
                      {showSelection && (
                        <td className="sticky left-0 bg-dark-100 group-hover:bg-dark-200">
                          <button
                            onClick={(e) => handleSelection(e, item)}
                            type="button"
                            className="-mt-[1px] h-14 w-full flex items-center justify-center"
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
                        </td>
                      )}
                      {filteredColumns.map((el) => {
                        let element = item[el.key];
                        if (typeof item[el.key] === 'number') {
                          element = element.toString();
                        }
                        const searchIndex = element.toLowerCase().indexOf(search.toLowerCase());
                        const matchedSearch = (element.toLowerCase().includes(search.toLowerCase()) && search) ? [element.slice(0, searchIndex), element.slice(searchIndex, searchIndex + search.length), element.slice(searchIndex + search.length, element.length)].filter((i) => i.length > 0) : [element];
                        const CustomTD = customColumns && customColumns[el.key];
                        return (
                          CustomTD ? (
                            <CustomTD
                              columnKey={el.key}
                              row={item}
                            />
                          ) : (
                            <td
                              className={`h-14 px-3 ${showSelection && 'pl-0'} ${el.key === isSticky && `sticky ${showSelection ? 'left-[50px]' : 'left-0'} bg-dark-100 group-hover:bg-dark-200`}`}
                            >
                              <div
                                className="flex items-center"
                              >
                                {matchedSearch.map((element, index) => (
                                  <span className={`${el.key === 'sku' && 'uppercase'} whitespace-pre ${matchedSearch.length === index + 1 && 'text-ellipsis overflow-hidden whitespace-nowrap'} ${element.toLowerCase() === search.toLowerCase() && 'font-semibold text-main-900'}`}>
                                    {element}
                                  </span>
                                ))}
                              </div>
                            </td>
                          )
                        );
                      })}
                    </tr>
                  </Link>
                ))}
              </tbody>
              )}
            </table>
          )}
          {initialData.length > 0 && filteredData.length === 0 && (
          <div className="p-5 h-[calc(100%-50px)] flex items-center justify-center">
            <div className="max-w-md flex flex-col items-center">
              <Void className="h-40" />
              <h3 className="mt-10 font-semibold">
                We're Sorry.
              </h3>
              <h6 className="text-center max-w-xs">
                We couldn't find any
                {' '}
                {dataType && dataType.key && dataType.key.p ? dataType.key.p : 'results'}
                {' '}
                matching this search.
              </h6>
            </div>
          </div>
          )}
          {initialData.length === 0 && (
          <div className="p-5 h-full flex items-center justify-center">
            <div className="max-w-md flex flex-col items-center">
              <Add className="h-40" />
              <h3 className="mt-10 font-semibold">
                You don't have any
                {' '}
                {dataType && dataType.label && dataType.label.p ? dataType.label.p : 'Items'}
                .
              </h3>
              <h6 className="text-center max-w-xs">
                Start by creating your first
                {' '}
                {dataType && dataType.key && dataType.key.s ? dataType.key.s : 'Item'}
                .
              </h6>
              <button type="button" className="mt-5 shrink-0 h-10 px-10 bg-main-900 text-sm font-semibold text-white rounded-md hover:bg-dark-900 transition duration-150 ease-in-out border-2 border-main-900 hover:border-dark-900">
                {selected.elements.length === 1
                  ? 'Duplicate' : 'Add'}
                {' '}
                {dataType && dataType.label && dataType.label.s ? dataType.label.s : 'New'}
              </button>
            </div>
          </div>
          )}
        </div>
      </section>
      {/* Pagination */}
      {initialData.length > 0 && showPagination && (
      <section className="-mx-5 h-16 shrink-0 border-t border-dark-300 flex items-center px-5 justify-between text-sm">
        {(isEmpty(selected.elements)) ? (<ShowedResults pagination={pagination} />)
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
        {pagination.totalPages > 1 && (
        <PagesNavigation
          pagination={pagination}
          setPagination={setPagination}
        />
        )}
        <PageSizeButton pagination={pagination} setPagination={setPagination} />

      </section>
      )}
    </>
  );
}

export default Table;
