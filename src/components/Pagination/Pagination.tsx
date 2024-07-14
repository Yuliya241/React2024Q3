import { PaginationProps } from '../../types/types';
import styles from './Pagination.module.css';

const Pagination = ({ setCurrentPage, currentPage }: PaginationProps) => {
  const pages = [];
  const count = 82;
  const limit = 10;

  for (let i = 1; i <= Math.ceil(count / limit); i += 1) {
    pages.push(i);
  }

  return (
    <div className={styles.pagination}>
      {pages.map((page) => {
        console.log();
        return (
          <button
            className={
              page.toString() == currentPage
                ? `${styles.button} ${styles.active} `
                : styles.button
            }
            onClick={() => setCurrentPage(page.toString())}
            key={page}
            data-testid={page}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;

// return (
//   <div className={styles.pagination}>
//     {data.length === limit || data.length < limit
//       ? pages.map((page) => {
//           return (
//             <button
//               className={
//                 page.toString() == currentPage
//                   ? `${styles.button} ${styles.active} `
//                   : styles.button
//               }
//               onClick={() => setCurrentPage(page.toString())}
//               key={page}
//             >
//               {page}
//             </button>
//           );
//         })
//       : pages
//           .filter((page) => page !== 1)
//           .map((page) => {
//             return (
//               <button
//                 className={styles.button}
//                 onClick={() => setCurrentPage(page.toString())}
//                 key={page}
//                 disabled
//               >
//                 {page}
//               </button>
//             );
//           })}
//   </div>
// );
