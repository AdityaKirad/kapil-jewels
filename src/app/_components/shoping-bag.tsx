import React from "react";

export function ShoppingBag(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.26 9.696l1.385 9A2 2 0 0 1 18.67 21H5.33a2 2 0 0 1-1.977-2.304l1.385-9A2 2 0 0 1 6.716 8h10.568a2 2 0 0 1 1.977 1.696M14 5a2 2 0 1 0-4 0"
      ></path>
    </svg>
  );
}
