import React from 'react';
import { ExternalLink } from 'react-feather';

function Activity({ feed }) {
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <div className="text-lg font-extrabold">
          <h2>Activity Feed</h2>
        </div>
      </div>
      <div className="flex-1 bg-dark-100 rounded-lg mt-1 overflow-y-auto h-60 lg:h-96 flex flex-col">
        {feed.map((item) => (
          <button
            key={`activity_${item.timestamp}`}
            type="button"
            className="group transition duration-100 ease-in-out flex py-4 items-stretch text-left hover:bg-dark-200 px-5 border-b border-dark-300 last:border-none"
          >
            <div className="mr-5 lg:mr-2 flex flex-row lg:flex-col flex-1">
              <span className="text-sm font-semibold text-main-900 mr-5 pt-0.5 text-justify">{item.timestamp}</span>
              <p className="flex-1 leading-snug">{item.notificaction}</p>
            </div>
            <div className="flex items-center justify-end text-dark-400 group-hover:text-main-900 transition duration-100 ease-in-out">
              <ExternalLink className="h-5 w-5" />
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Activity;
