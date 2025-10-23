import React from 'react';

const ClipboardCheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-1.125 0-2.062.938-2.062 2.063v15.375c0 1.125.938 2.063 2.063 2.063h12.75c1.125 0 2.063-.938 2.063-2.063V4.313c0-1.125-.938-2.063-2.063-2.063h-4.5m-6.75 0a2.25 2.25 0 012.25-2.25h1.5a2.25 2.25 0 012.25 2.25m-6.75 0h6.75m-11.25 6l3.375 3.375L16.5 7.875" />
  </svg>
);

export default ClipboardCheckIcon;