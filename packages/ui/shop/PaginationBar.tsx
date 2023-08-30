
import Link from "next/link";

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

const PaginationBar = (props: any) => {
  const { searchParams, numberofButton } = props;

  // Function to determine the classname
  const getClassName = (index: number) => {
    if (!searchParams.page) {
      return index + 1 === 1 ? "purple-button" : "white-button";
    }
    return searchParams.page.toString() === (index + 1).toString()
      ? "purple-button"
      : "white-button";
  };

  return (
    <div className="pagination-bar ">
      {Array.from({ length: numberofButton }).map((_, index) => (
        <Link
          href={`/shop?page=${index + 1}`}
          className={`light-border ${getClassName(index)}`}
          key={index}
        >
          {index + 1}
        </Link>
      ))}
    </div>
  );
};

export default PaginationBar;



// import Link from "next/link";
// import { useState, useEffect } from "react";

// const PaginationBar = (props:any) => {
//   const { searchParams, numberofButton } = props;

//   // Initialize selected page with the value from searchParams, or 1 if not provided.
//   const [selectedPage, setSelectedPage] = useState(
//     searchParams.page ? parseInt(searchParams.page) : 1
//   );

//   // Update selectedPage when searchParams.page changes.
//   useEffect(() => {
//     setSelectedPage(searchParams.page ? parseInt(searchParams.page) : 1);
//   }, [searchParams.page]);

//   // Function to determine the classname using memoization.
//   const getClassName = (index:number) => {
//     if (selectedPage === index + 1) {
//       return "purple-button";
//     }
//     return "white-button";
//   };

//   return (
//     <div className="pagination-bar">
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
