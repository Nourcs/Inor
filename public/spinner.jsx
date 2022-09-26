// import * as React from 'react';

// function SvgComponent(props) {
//   return (
//     <svg

//     >
//       <path
//         d="M20 40a20.005 20.005 0 0 1-7.785-38.428 20.005 20.005 0 0 1 15.57 36.857A19.875 19.875 0 0 1 20 40Zm-.185-36.3A16.481 16.481 0 1 0 36.3 20.185 16.5 16.5 0 0 0 19.815 3.7Z"
//         fill="#EAEAEA"
//       />
//       <path
//         d="M40 20h-3.7A16.574 16.574 0 0 0 20 3.705V0a19.983 19.983 0 0 1 20 20Z"
//         fill="#84a98c"
//       >

//       </path>
//     </svg>
//   );
// }

// export default SvgComponent;
import * as React from 'react';

function SvgComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 40 40"
      xmlSpace="preserve"
      {...props}
    >
      <path
        d="M20 40A20 20 0 0 1 5.858 5.858a20 20 0 0 1 28.284 28.284A19.869 19.869 0 0 1 20 40Zm0-36a16 16 0 1 0 16 16A16.018 16.018 0 0 0 20 4Z"
        fill="#f5f5f5"
      />
      <path
        d="M36 20a15.9 15.9 0 0 0-4.691-11.309A15.9 15.9 0 0 0 20 4a2 2 0 1 1 0-4 19.868 19.868 0 0 1 14.142 5.857A19.873 19.873 0 0 1 40 20a2 2 0 1 1-4 0Z"
        fill="#84a98c"
      >
        <animateTransform
          attributeType="xml"
          attributeName="transform"
          type="rotate"
          from="0 20 20"
          to="360 20 20"
          dur="1s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
}

export default SvgComponent;
