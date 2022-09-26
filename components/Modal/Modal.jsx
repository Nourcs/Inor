/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { XCircle } from 'react-feather';

function Modal({ closeModal, children, title }) {
  useEffect(() => {
    const onEscapeKeyPress = (e) => e.keyCode === 27 && closeModal();
    document.addEventListener('keydown', onEscapeKeyPress);
    return () => {
      document.removeEventListener('keydown', onEscapeKeyPress);
    };
  });

  return (

    <div className="fixed top-0 left-0 w-screen h-screen backdrop-blur-sm backdrop-brightness-50 flex items-center justify-center">
      <div className="absolute w-full h-full" onClick={closeModal} />
      <div className="bg-dark-100 max-w-3xl w-full h-5/6 rounded-md relative flex flex-col justify-between">
        <div className="bg-orange-900 p-5 rounded-t-md flex items-center justify-between">
          <h2 className="text-dark-100 font-bold text-lg">
            {title}
          </h2>
          <button type="button" onClick={closeModal} className="text-dark-100 hover:scale-110 transition-all duration-100 ease-in-out">
            <div>
              <XCircle className="h-5 w-5" />
            </div>
          </button>
        </div>
        <div className="overflow-y-auto p-5 flex-1">
          {children}
        </div>
        <div className="px-5 py-3 flex items-center justify-end">
          <button
            onClick={closeModal}
            type="button"
            className="text-dark-600 font-bold text-sm h-10 mx-10 hover:text-dark-900 transition duration-100 ease-in-out flex items-center justify-center"
          >
            Cancel
          </button>
          <button
            type="button"
            className="text-dark-100 font-bold text-sm h-10 px-10 bg-orange-900 rounded-full flex items-center justify-center"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
