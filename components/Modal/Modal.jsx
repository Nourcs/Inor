/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { PlusCircle, XCircle } from 'react-feather';

function Modal({
  close, children, title, open, icon,
}) {
  useEffect(() => {
    const onEscapeKeyPress = (e) => e.keyCode === 27 && close();
    document.addEventListener('keydown', onEscapeKeyPress);
    return () => {
      document.removeEventListener('keydown', onEscapeKeyPress);
    };
  });

  return (

    <div
      style={{ transition: 'visibility 0.15s, opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1)' }}
      className={`${open ? 'visible opacity-100' : 'opacity-0 invisible'} fixed transition duration-150 ease-in-out top-0 left-0 w-screen h-screen backdrop-blur-sm backdrop-brightness-50 flex items-center justify-center z-30`}
    >
      <div className="absolute w-full h-full" onClick={close} />
      <div className="bg-dark-100 max-w-3xl w-full h-full md:max-h-[75vh] rounded-md relative flex flex-col justify-between">
        <div className="bg-main-900 p-5 rounded-t-md flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-white mr-3">
              { icon || <PlusCircle className="h-5 w-5" />}
            </div>
            <h2 className="text-dark-100 font-bold text-lg">
              {title}
            </h2>
          </div>
          <button type="button" onClick={close} className="text-dark-100 hover:scale-110 transition-all duration-100 ease-in-out">
            <div>
              <XCircle className="h-6 w-6" />
            </div>
          </button>
        </div>
        <div className="overflow-y-auto flex-1">
          {children}
        </div>
        <div className="px-5 py-3 flex items-center justify-end">
          <button
            onClick={close}
            type="button"
            className="text-dark-600 font-bold text-sm h-10 mx-10 hover:text-dark-900 transition duration-100 ease-in-out flex items-center justify-center"
          >
            Cancel
          </button>
          <button
            type="button"
            className="text-dark-100 hover:bg-dark-900 transition duration-150 ease-in-out font-bold text-sm h-10 px-10 bg-main-900 rounded-full flex items-center justify-center"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
