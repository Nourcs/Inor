// import React, {
//   useCallback, useEffect, useLayoutEffect, useRef, useState,
// } from 'react';
// import Select from 'react-select';
// import {
//   Check, Maximize2, ChevronUp, ChevronDown,
// } from 'react-feather';

// function TableHeader({
//   headings, selectAll, setSelectAll, sortBy, setSortBy,
// }) {
//   const handleSorting = (label) => {
//     if (sortBy.label === label) {
//       if (sortBy.ascending) {
//         setSortBy({ label, ascending: !sortBy.ascending });
//       } else {
//         setSortBy({ label: '', ascending: true });
//       }
//     } else {
//       setSortBy({ label, ascending: true });
//     }
//   };

//   return (
//     <section className="px-5">
//       <div className="flex w-full justify-between mt-5 bg-main-900 px-5 py-3 pr-10 rounded-t-md text-white">
//         {headings.map((item, index) => (
//           <div className={`${index === 0 ? 'flex-[1.5_1.5_0%]' : 'flex-1'} flex items-center`}>
//             {index === 0 && (
//             <button
//               type="button"
//               className={`h-4 w-4 border-2 rounded mr-3 flex items-center -mt-0.5 justify-center ${selectAll ? 'border-dark-100 bg-dark-100' : 'border-white hover:opacity-50'}`}
//               onClick={() => setSelectAll(!selectAll)}
//             >
//               {selectAll && (
//               <div>
//                 <Check className="h-3 w-3 text-main-900 mt-0.5" strokeWidth={3} />
//               </div>
//               )}
//             </button>
//             )}
//             {item.value && (
//             <button type="button" className="flex items-center group" onClick={() => handleSorting(item.value)}>
//               <span className="text-sm font-bold">
//                 {item.label}
//               </span>
//               <div className="flex flex-col ml-3 text-white text-opacity-50 group-hover:text-opacity-100 transition duration-100 ease-in-out">
//                 <div className={`${sortBy.label === item.value && !sortBy.ascending && 'text-transparent'}`}>
//                   <ChevronUp className="h-3 w-3" />
//                 </div>
//                 <div className={`-mt-1 ${sortBy.label === item.value && sortBy.ascending && 'text-transparent'}`}>
//                   <ChevronDown className="h-3 w-3" />
//                 </div>
//               </div>
//             </button>
//             )}
//           </div>
//         ))}
//         <div className="w-10 text-sm font-bold" />
//       </div>
//     </section>
//   );
// }

// function Table({
//   initialData, headings, children, search,
// }) {
//   const [data, setData] = useState([...initialData]);

//   // Table
//   const [scrollable, setScrollable] = useState(false);
//   const tableRef = useRef(null);

//   // Table Pagination
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [numberOfPages, setNumberOfPages] = useState(Math.ceil(data.length / rowsPerPage));
//   const [page, setPage] = useState(0);

//   // Table Pagination Options
//   const options = data.map((item, index) => ({ value: index + 1, label: index + 1 }));
//   options.unshift({ label: 'All', value: data.length });

//   // Table Sorting
//   const [sortBy, setSortBy] = useState({ label: '', ascending: true });

//   // Table Data
//   const [tableData, setTableData] = useState([...data].slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage));

//   // Update Sorting
//   const handleSorting = () => {
//     if (sortBy.label) {
//       if (sortBy.ascending) {
//         setTableData([...data]
//           .sort((a, b) => {
//             if (a[sortBy.label] < b[sortBy.label]) {
//               return -1;
//             } if (a[sortBy.label] > b[sortBy.label]) {
//               return 1;
//             }
//             return 0;
//           })
//           .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage));
//       } else {
//         setTableData([...data]
//           .sort((a, b) => {
//             if (a[sortBy.label] > b[sortBy.label]) {
//               return -1;
//             } if (a[sortBy.label] < b[sortBy.label]) {
//               return 1;
//             }
//             return 0;
//           })
//           .slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage));
//       }
//     } else {
//       setTableData([...data].slice(page * rowsPerPage, (page * rowsPerPage) + rowsPerPage));
//     }
//   };

//   // Table Selection
//   const [selectAll, setSelectAll] = useState(false);
//   const [selectedRows, setSelectedRows] = useState([]);

//   const handleRowSelection = (id) => {
//     const newArr = [...selectedRows];
//     if (selectedRows.includes(id)) {
//       newArr.splice(selectedRows.findIndex((item) => item === id), 1);
//     } else {
//       newArr.push(id);
//     }
//     setSelectedRows(newArr);
//   };

//   useEffect(() => {
//     setSelectedRows([]);
//   }, [selectAll]);

//   // Update current page and number of pages when rowsPerPage is updated
//   useEffect(() => {
//     setPage(0);
//     setNumberOfPages(Math.ceil([...data].length / rowsPerPage));
//   }, [rowsPerPage, data]);

//   // Handle Search
//   useEffect(() => {
//     const newData = [...initialData].filter((item) => {
//       const valid = Object
//         .values(item)
//         .some((val) => val.toString().toLowerCase().includes(search.toLowerCase()));
//       if (valid) return item;
//     });

//     setData([...newData]);
//   }, [search]);

//   // Update tableData when page and/or rowsPerPage are updated
//   useEffect(() => {
//     handleSorting();
//   }, [page, rowsPerPage, sortBy, data]);

//   // Update table scroll when needed
//   useEffect(() => {
//     setScrollable(tableRef.current.scrollHeight > tableRef.current.clientHeight);
//   }, [tableRef, page, rowsPerPage, sortBy, tableData, data]);

//   // Next Page
//   const nextPage = () => {
//     if (page < numberOfPages - 1) {
//       setPage(page + 1);
//     }
//   };

//   // Previous Page
//   const previousPage = () => {
//     if (page > 0) {
//       setPage(page - 1);
//     }
//   };

//   return (
//     <>
//       <div className="flex items-center justify-between px-5">
//         {children}
//       </div>
//       {/* Table Header */}
//       <TableHeader
//         headings={headings}
//         selectAll={selectAll}
//         setSelectAll={setSelectAll}
//         sortBy={sortBy}
//         setSortBy={setSortBy}
//       />
//       <div className="mx-5 mb-5 flex-1 overflow-y-auto bg-dark-100 rounded-b-md" ref={tableRef}>
//         {data.length > 0 && (
//           <>
//             {tableData.map((item) => (
//               <div className={`flex items-center w-full justify-start py-4 px-5 border-b border-dark-300 cursor-pointer hover:bg-dark-200 ${!scrollable ? 'pr-10' : 'last:border-none'}`}>
//                 {headings.map((header, index) => (
//                   <div className={`${index === 0 ? 'flex-[1.5_1.5_0%]' : 'flex-1'} flex items-center`}>
//                     {index === 0 && (
//                     <button
//                       type="button"
//                       className={`h-4 w-4 -mt-0.5 border-2 rounded mr-3 flex items-center justify-center ${selectAll || selectedRows.includes(item[header.value]) ? 'border-main-900 bg-main-900' : 'border-dark-600 hover:border-dark-700'}`}
//                       onClick={() => handleRowSelection(item[header.value])}
//                     >
//                       {(selectAll || selectedRows.includes(item[header.value])) && (
//                       <div>
//                         <Check className="h-3 w-3 text-white" strokeWidth={3} />
//                       </div>
//                       )}
//                     </button>
//                     )}
//                     <span>
//                       {search
//                         ? item[header.value].toString().replace(search, `/${search}/`).split('/').map((el) => (
//                           <span className={`${el === search && 'font-black text-main-900'}`}>
//                             {el}
//                           </span>
//                         ))
//                         : item[header.value]}
//                     </span>
//                   </div>
//                 ))}
//                 <div className="w-10 flex items-center justify-end">
//                   <button type="button" className="transition duration-100 ease-in-out text-dark-600 hover:text-main-900">
//                     <div><Maximize2 className="h-5 w-5" /></div>
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </>
//         )}
//         {(search.length > 0 && initialData.length > 0 && data.length === 0) && (
//           <div className="flex items-center flex-col justify-center h-full">
//             <img src="/void.svg" className=" h-40" />
//             <div className="mt-5 font-bold text-sm">
//               No results found.
//             </div>
//           </div>
//         )}
//         {initialData.length === 0 && (
//           <div className="flex items-center flex-col justify-center h-full">
//             <img src="/add.svg" className=" h-40" />
//             <div className="mt-5 font-bold text-sm text-center">
//               You don't have any products.
//             </div>
//             {/* <span className="text-lg font-bold max-w-sm text-center"></span> */}
//             <button type="button" className="mt-3 text-white font-bold text-sm h-10 px-10 bg-main-900 rounded-full flex items-center justify-center">
//               Add Product
//             </button>
//           </div>
//         )}
//       </div>
//       {data.length > 0 && (
//       <div
//         className="h-16 border-t border-dark-300 flex items-center justify-between px-5"
//         // style={{ boxShadow: '0px -5px 8px 0px rgba(0,0,0,0.08)' }}
//       >
//         <div className="flex-1">
//           Showing
//           {' '}
//           <span className="font-semibold">{page * rowsPerPage + 1}</span>
//           {' '}
//           -
//           {' '}
//           <span className="font-semibold">{rowsPerPage * (page + 1) > data.length ? data.length : rowsPerPage * (page + 1)}</span>
//           {' '}
//           of
//           {' '}
//           <span className="font-semibold">{data.length}</span>
//           {' '}
//           results
//         </div>
//         <div className="flex items-center flex-1 justify-center">
//           <button
//             type="button"
//             className={`mr-5 text-dark-600  transition duration-100 ease-in-out text-sm font-bold ${page === 0 ? '' : 'hover:text-main-900'}`}
//             onClick={previousPage}
//           >
//             Previous
//           </button>
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setPage(0)}
//               type="button"
//               className={`text-white rounded-full h-5 w-5 flex items-center justify-center font-bold text-xs ${page === 0 ? 'bg-main-900' : 'bg-dark-300'}`}
//             >
//               1
//             </button>
//             {numberOfPages > 4 && page > 1 && (<div>...</div>)}
//             {numberOfPages === 3 && (
//             <button
//               onClick={() => setPage(1)}
//               type="button"
//               className={`text-white rounded-full h-5 w-5 flex items-center justify-center font-bold text-xs ${page === 1 ? 'bg-main-900' : 'bg-dark-300'}`}
//             >
//               2
//             </button>
//             )}
//             {numberOfPages > 3 && (
//             <>
//               <button
//                 onClick={() => setPage((page === 0 ? page + 2 : (page === numberOfPages - 2 ? page : (page === numberOfPages - 1 ? page - 1 : page + 1))) - 1)}
//                 type="button"
//                 className={`text-white rounded-full h-5 w-5 flex items-center justify-center font-bold text-xs ${page + 1 === (page === 0 ? page + 2 : (page === numberOfPages - 2 ? page : (page === numberOfPages - 1 ? page - 1 : page + 1))) ? 'bg-main-900' : 'bg-dark-300'}`}
//               >
//                 {page === 0 ? page + 2 : (page === numberOfPages - 2 ? page : (page === numberOfPages - 1 ? page - 1 : page + 1)) }
//               </button>

//               <button
//                 onClick={() => setPage((page === 0 ? page + 3 : (page === numberOfPages - 3 || page === numberOfPages - 2 || page === numberOfPages - 1 ? numberOfPages - 1 : page + 2)) - 1)}
//                 type="button"
//                 className={`text-white rounded-full h-5 w-5 flex items-center justify-center font-bold text-xs ${page + 1 === (page === 0 ? page + 3 : (page === numberOfPages - 3 || page === numberOfPages - 2 || page === numberOfPages - 1 ? numberOfPages - 1 : page + 2)) && 'A' ? 'bg-main-900' : 'bg-dark-300'}`}
//               >
//                 {page === 0 ? page + 3 : (page === numberOfPages - 3 || page === numberOfPages - 2 || page === numberOfPages - 1 ? numberOfPages - 1 : page + 2)}
//               </button>
//             </>
//             )}

//             {numberOfPages > 4 && page < numberOfPages - 3 && (<div>...</div>)}
//             {numberOfPages > 1 && (
//             <button
//               onClick={() => setPage(numberOfPages - 1)}
//               type="button"
//               className={`text-white rounded-full h-5 w-5 flex items-center justify-center font-bold text-xs ${page === numberOfPages - 1 ? 'bg-main-900' : 'bg-dark-300'}`}
//             >
//               {numberOfPages}
//             </button>
//             )}
//           </div>

//           <button
//             type="button"
//             className={`ml-5 text-dark-600 transition duration-100 ease-in-out text-sm font-bold ${page === numberOfPages - 1 ? '' : 'hover:text-main-900'}`}
//             onClick={nextPage}
//           >
//             Next
//           </button>
//         </div>
//         <div className="flex items-center flex-1 justify-end">
//           Show :
//           <Select
//             options={options}
//             menuPlacement="top"
//             className="mx-2"
//             value={{ label: rowsPerPage, value: rowsPerPage }}
//             onChange={(e) => setRowsPerPage(e.value)}
//           />
//           results
//         </div>
//       </div>
//       )}
//     </>
//   );
// }

// export default Table;
import 'ka-table/style.css';

import React, { useState } from 'react';

import { kaReducer, Table } from 'ka-table';
import { DataType, EditingMode, SortingMode } from 'ka-table/enums';
import { Maximize2, Square } from 'react-feather';
import { updatePageIndex, updatePageSize } from 'ka-table/actionCreators';

const ROW_MOUSE_ENTER = 'ROW_MOUSE_ENTER';
const ROW_MOUSE_LEAVE = 'ROW_MOUSE_LEAVE';

const dataArray = Array(30)
  .fill(undefined)
  .map((_, index) => ({
    sku: `SKU: ${index}`,
    name: `Name: ${index}`,
    category: `Category: ${index}`,
    supplier: `Supplier:${index}`,
    warehouse: `Warehouse: ${index}`,
    quantity: `Quantity: ${index}`,
    price: `Price: ${index}`,
    sales: `Sales: ${index}`,
    id: index,
  }));

const columns = [
  {
    key: 'sku', title: 'SKU', dataType: DataType.String, width: 175,
  },
  {
    key: 'name', title: 'Name', dataType: DataType.String, width: 200,
  },
  {
    key: 'category', title: 'Category', dataType: DataType.String, width: 175,
  },
  {
    key: 'supplier', title: 'Supplier', dataType: DataType.String, width: 175,
  },
  {
    key: 'warehouse', title: 'Warehouse', dataType: DataType.String, width: 175,
  },
  {
    key: 'quantity', title: 'Quantity', dataType: DataType.String, width: 175,
  },
  {
    key: 'price', title: 'Price', dataType: DataType.String, width: 175,
  },
  {
    key: 'sales', title: 'Sales', dataType: DataType.String, width: 175,
  },
  {
    key: 'action', title: '', dataType: DataType.String, width: 50,
  },
];

const tablePropsInit = {
  columns,
  data: dataArray,
  // editingMode: EditingMode.Cell,
  rowKeyField: 'sku',
  sortingMode: SortingMode.Single,
  paging: {
    enabled: true,
    pageIndex: 0,
    pageSize: 10,
    pageSizes: [5, 10, 15],
  },

};

function AlertCell({ rowData }) {
  return (
    <div className="flex items-center">
      <button type="button" className="mr-2">
        <div>
          <Square className="h-5 w-5" />
        </div>
      </button>
      {rowData.sku}
    </div>
  );
}

const childAttributes = {
  dataRow: {
    elementAttributes: (props) => ({
      title: `${props.rowData.name} ${props.rowData.phoneNumber}`,
      onMouseEnter: (event, extendedEvent) => {
        const {
          childProps: {
            rowKeyValue,
          },
          dispatch,
        } = extendedEvent;
        dispatch({ type: ROW_MOUSE_ENTER, rowKeyValue });
      },
      onMouseLeave: (event, { dispatch }) => {
        dispatch({ type: ROW_MOUSE_LEAVE });
      },
    }),
  },
  headCell: {
    elementAttributes: (props) => {
      if (props.column.key === 'sku') {
        return {
          style: {
            ...props.column.style,
            position: 'sticky',
            left: 0,
            zIndex: 10,
          },
        };
      } if (props.column.key === 'action') {
        return {
          style: {
            ...props.column.style,
            position: 'sticky',
            right: 0,
            zIndex: 10,
          },
        };
      }
    },
  },
  cell: {
    elementAttributes: (props) => {
      if (props.column.key === 'sku') {
        return {
          style: {
            ...props.column.style,
            position: 'sticky',
            left: 0,
            backgroundColor: '#eee',
          },
        };
      }
      if (props.column.key === 'action') {
        return {
          style: {
            ...props.column.style,
            position: 'sticky',
            right: 0,
            backgroundColor: '#eee',
          },
        };
      }
    },
  },
  cellText: {
    content: (props) => {
      switch (props.column.key) {
        case 'sku':
          return <AlertCell {...props} />;
        case 'action':
          return (
            <button type="button" className="flex items-center justify-center w-full h-full text-dark-400 hover:text-main-900">
              <div>
                <Maximize2 className="h-5 w-5" />
              </div>
            </button>
          );
      }
    },
  },
  pagingSizes: {
    content: (props) => <PageSizeSelector {...props} />,
  },
  pagingPages: {
    content: (props) => <PagesSelector {...props} />,
  },
};

function PageSizeSelector({ pageSize, pageSizes, dispatch }) {
  return (
    <div className="mt-3">
      Page Size:
      <select
        className="form-control"
        value={pageSize}
        onChange={(event) => {
          dispatch(updatePageSize(Number(event.currentTarget.value)));
        }}
      >
        {pageSizes?.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
}

function PagesSelector({ pageIndex, pagesCount, dispatch }) {
  return (
    <div className="mt-3">
      Page Number:
      <select
        className="form-control"
        value={pageIndex}
        onChange={(event) => {
          dispatch(updatePageIndex(Number(event.currentTarget.value)));
        }}
      >
        {[...Array(pagesCount)].map((_, index) => (
          <option key={index} value={index}>
            {index + 1}
          </option>
        ))}
      </select>
    </div>
  );
}

function OverviewDemo() {
  const [tableProps, changeTableProps] = useState(tablePropsInit);
  const [selectedItem, changeSelectedItem] = useState();

  const dispatch = (action) => {
    if (action.type === ROW_MOUSE_ENTER || action.type === ROW_MOUSE_LEAVE) {
      changeSelectedItem(dataArray.find((i) => i.sku === action.rowKeyValue));
    }
    changeTableProps((prevState) => kaReducer(prevState, action));
  };

  return (
    <>
      <Table
        {...tableProps}
        dispatch={dispatch}
        childComponents={childAttributes}
      />
      {/* { selectedItem && (
      <div className="info">
        Hovered:
        {' '}
        {selectedItem.name}
      </div>
      )} */}
    </>
  );
}

export default OverviewDemo;
