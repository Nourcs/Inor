import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import {
  Check,
  ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Search, Square,
} from 'react-feather';
import { range } from 'lodash';
import { CSVLink } from 'react-csv';

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
function Table({ data, columns }) {
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
  const [sorting, setSorting] = useState({
    filterBy: 'sku',
    type: 'initial',
  });

  const handleSorting = (e, filterBy) => {
    e.preventDefault();
    if (sorting.filterBy === filterBy) {
      if (sorting.type === 'initial') {
        setSorting({ ...sorting, type: 'ascending' });
      } else if (sorting.type === 'ascending') {
        setSorting({ ...sorting, type: 'descending' });
      } else {
        setSorting({ ...sorting, type: 'initial' });
      }
    } else {
      setSorting({ filterBy, type: 'ascending' });
    }
  };

  const sortedData = (a, b) => {
    if (sorting.type === 'ascending') {
      if (a.sku < b.sku) {
        return -1;
      }
      if (a.sku > b.sku) {
        return 1;
      }
      return 0;
    } if (sorting.type === 'descending') {
      if (a.sku > b.sku) {
        return -1;
      }
      if (a.sku < b.sku) {
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
    .sort(sortedData)
    .slice((paging.page * paging.pageSize + 1) - 1, paging.pageSize * (paging.page + 1));

  const [filteredData, setSortingedData] = useState(handleFilteredData);

  // Updates
  useEffect(() => {
    setSortingedData(handleFilteredData);
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
  }, [paging.pageSize, data]);

  useEffect(() => {
    setSortingedData(handleFilteredData);
  }, [paging.page, sorting]);

  return (
    <>
      <div className="px-5 pb-5 flex items-center justify-between">
        <div className="border-2 border-dark-300 h-10 rounded-full flex items-center relative flex-1 md:max-w-md sm:mr-3">
          <div className="text-dark-400 absolute left-3">
            <Search className="h-5 w-5" strokeWidth={2.5} />
          </div>
          <input
            type="text"
            placeholder="Search"
            className="placeholder:text-dark-400 outline-none font-semibold w-full h-full bg-transparent pl-10 pr-3"
          />
        </div>
        <div className="hidden sm:flex items-center justify-end">
          <button type="button" className="h-10 px-10 bg-white text-sm font-semibold text-main-900 mr-3 rounded-full hover:bg-main-900 hover:text-white transition duration-150 ease-in-out border-2 border-main-900">
            <CSVLink
              data={data}
                // data={data.map((item) => Object.values(item))}
                // headers={columns.map((item) => item.title)}
              headers={columns.map((item) => ({ label: item.title, key: item.key }))}
              filename="today"
            >
              Export CSV
            </CSVLink>
          </button>
          <button type="button" className="shrink-0 h-10 px-10 bg-main-900 text-sm font-semibold text-white rounded-full hover:bg-dark-900 transition duration-150 ease-in-out border-2 border-main-900 hover:border-dark-900">
            Add Product
          </button>
        </div>
      </div>
      <div
        className="flex-1 overflow-auto px-5 pb-5 flex"
      >
        <div className="bg-dark-100 rounded-md w-full overflow-auto">
          <table className="table-fixed border-collapse w-full text-sm">
            <colgroup>
              {columns.map((item) => <col width={item.width} />)}
            </colgroup>
            <thead className="bg-main-900 text-left h-12 rounded-md sticky top-0 text-dark-100 z-10">
              <tr>
                {columns.map((item) => (
                  <th
                    className={`first:pl-5 px-3 last:pr-5 ${item.key === 'sku' && 'sticky left-0 top-0 bg-main-900 z-20'}`}
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
                          className="mr-2 -mt-[1px]"
                        >
                          <div className={`h-[15px] w-[15px] border-2 flex items-center justify-center rounded-sm  transition duration-150 ease-in-out ${selected.all ? 'bg-white border-white' : 'border-white border-opacity-30 hover:border-opacity-100'}`}>
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
                            className={`opacity-30 group-hover:opacity-100 transition duration-150 ease-in-out ${sorting.filterBy === item.key && sorting.type === 'descending' && 'invisible'} ${sorting.filterBy === item.key && sorting.type === 'ascending' && 'opacity-100'}`}
                          >
                            <ChevronUp className="h-3 w-3" strokeWidth={2.5} />
                          </div>
                          <div
                            className={`-mt-1 opacity-30 group-hover:opacity-100 transition duration-150 ease-in-out ${sorting.filterBy === item.key && sorting.type === 'ascending' && 'invisible'} ${sorting.filterBy === item.key && sorting.type === 'ascending' && 'opacity-100'}`}
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
                    {Object.keys(item).map((el) => (
                      <td className={`px-5 h-14 ${el === 'sku' && 'sticky left-0 bg-dark-100 group-hover:bg-dark-200'}`}>
                        <div className="flex items-center">
                          {el === 'sku' && (
                            <button
                              onClick={(e) => handleSelection(e, item)}
                              type="button"
                              className="mr-2 -mt-[1px]"
                            >
                              <div className={`h-[15px] w-[15px] border-2 flex items-center justify-center rounded-sm  transition duration-150 ease-in-out ${selected.elements.includes(item) ? 'bg-main-900 border-main-900' : 'border-dark-300 hover:border-main-900'}`}>
                                {selected.elements.includes(item) && (
                                <div>
                                  <Check className="text-dark-100 h-3 w-3" strokeWidth={3} />
                                </div>
                                )}
                              </div>
                            </button>
                          )}
                          {item[el]}
                        </div>
                      </td>
                    ))}
                  </tr>
                </Link>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="h-16 shrink-0 border-t border-dark-300 flex items-center px-5 justify-between text-sm">
        <Results paging={paging} />
        {paging.pages > 1 && (<Pages paging={paging} setPaging={setPaging} />)}
        <PageSize paging={paging} setPaging={setPaging} />
      </div>
    </>
  );
}

export default Table;
