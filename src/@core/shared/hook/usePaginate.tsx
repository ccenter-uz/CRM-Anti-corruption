"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export const usePagination = () => {
  const router = useRouter();
  const params = useSearchParams();
  const paginate = {
    current: params.has("page") ? Number(params.get("page")) : 1,
    pageSize: params.has("pageSize") ? Number(params.get("pageSize")) : 10,
  };
  // setter for total
  const [total, setTotal] = useState(100);

  // pageChange
  const handlePageChange = (page: number) => {
    router.push(`?page=${page}&pageSize=${paginate.pageSize}`);
  };

  // pageSizeChange
  const handlePageSizeChange = (pageSize: number) => {
    router.push(`?page=${1}&pageSize=${pageSize}`);
  };

  return {
    current: paginate.current,
    pageSize: paginate.pageSize,
    total,
    setTotal,
    handlePageChange,
    handlePageSizeChange,
  };
};
