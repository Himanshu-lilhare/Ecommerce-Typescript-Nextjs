"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { useState, useEffect } from "react";

const PaginationBar = (props: any) => {
  const router = useRouter();

  const { numberofButton } = props;

  let searchParam = new URLSearchParams(window.location.search);
  let pagenumber = searchParam.get("page")
    ? parseInt(searchParam.get("page")!)
    : 1;
  const [selectedPage, setSelectedPage] = useState(pagenumber);
 
  const getClassName = (index: number) => {
    if (selectedPage === index + 1) {
      return "purple-button";
    }
    return "white-button";
  };

  function handleRouter(page: number) {
    searchParam.set("page", page.toString());
    setSelectedPage(page);
    router.push(`/shop?${searchParam.toString()}`);
  }
  return (
    <div className="pagination-bar">
      {Array.from({ length: numberofButton }).map((_, index) => (
        <button
          onClick={() => handleRouter(index + 1)}
          className={`light-border ${getClassName(index)}`}
          key={index}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default PaginationBar;

// const PaginationBar = (props: any) => {
//   let arrayof = [];
//   for (let i = 0; i < props.numberofButton; i++) {
//     arrayof.push("1");
//   }
//   console.log(props.searchParams.page);
//   return (
//     <div className="pagination-bar ">
//       {arrayof.map((num: any, index: number) => {
//         return (
//           <Link
//             href={`/shop?page=${index + 1}`}
//             className={`light-border  ${
//               props.searchParams.page
//                 ? props.searchParams.page?.toString() ===
//                   (index + 1)?.toString()
//                   ? "purple-button"
//                   : "white-button"
//                 : index + 1 === 1
//                 ? "purple-button"
//                 : "white-button"
//             }`}
//             key={index}
//           >
//             {index + 1}
//           </Link>
//         );
//       })}
//     </div>
//   );
// };

// export default PaginationBar;

// after code

// const PaginationBar = (props: any) => {
//   const { searchParams ,  numberofButton } = props;

//   // Function to determine the classname
//   const getClassName = (index: number) => {
//     if (!searchParams.page) {
//       return index + 1 === 1 ? "purple-button" : "white-button";
//     }
//     return searchParams.page.toString() === (index + 1).toString()
//       ? "purple-button"
//       : "white-button";
//   };

//   return (
//     <div className="pagination-bar ">
//       {Array.from({ length: numberofButton }).map((_, index) => (
//         <Link
//           href={`/shop?page=${index + 1}`}
//           className={`light-border ${getClassName(index)}`}
//           key={index}
//         >
//           {index + 1}
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default PaginationBar;
