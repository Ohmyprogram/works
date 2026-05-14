import React from "react";

import { Link } from "gatsby";
import classNames from "classnames";

import { pagination } from "@/constants/pagination";

import * as styles from "./pagination.module.scss";

type Props = {
  prevPagePath: string;
  nextPagePath: string;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  currentPage: number;
  totalPages: number;
};

const Pagination = ({
  prevPagePath,
  nextPagePath,
  hasNextPage,
  hasPrevPage,
  currentPage,
  totalPages,
}: Props) => {
  const prevClassName = classNames(styles.previousLink, {
    [styles.disable]: !hasPrevPage,
  });

  const nextClassName = classNames(styles.nextLink, {
    [styles.disable]: !hasNextPage,
  });

  return (
    <div className={styles.pagination}>
      <div className={styles.previous}>
        <Link
          rel="prev"
          to={hasPrevPage ? prevPagePath : "/"}
          className={prevClassName}
        >
          {pagination.prevPage}
        </Link>
      </div>
      <div className={styles.current}>
        {currentPage + 1} / {Math.max(totalPages, 1)}
      </div>
      <div className={styles.next}>
        <Link
          rel="next"
          to={hasNextPage ? nextPagePath : "/"}
          className={nextClassName}
        >
          {pagination.nextPage}
        </Link>
      </div>
    </div>
  );
};

export { Pagination };
