import React from 'react';
import { ExternalLink } from 'react-feather';

function Activity({ feed }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-lg font-extrabold">
          Activity Feed
        </div>
      </div>
      <div className="flex-1 bg-dark-100 rounded-lg mt-1 overflow-y-auto min-h-[444px] max-h-[444px] flex flex-col">
        {feed.map((item) =>
          // const initials = `${item.employee.split(' ')[0][0]}${item.employee.split(' ')[item.employee.split(' ').length - 1][0]}`;
          (
            <button
              type="button"
              className="group transition duration-100 ease-in-out flex py-3 items-stretch text-left hover:bg-dark-200 px-5 border-b border-dark-300 last:border-none first:pt-5 last:pb-5"
            >
              <span className="text-sm font-semibold text-main-900 mr-5 pt-0.5">{item.timestamp}</span>
              <p className="flex-1 leading-snug">{item.notificaction}</p>
              <div className="flex items-center w-10 justify-end text-dark-500 group-hover:text-main-900 transition duration-100 ease-in-out">
                <ExternalLink className="h-5 w-5" />
              </div>
            </button>
          ))}
      </div>
    </>
  );
}

export default Activity;
