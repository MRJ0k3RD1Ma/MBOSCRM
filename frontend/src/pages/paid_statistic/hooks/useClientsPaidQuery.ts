import { useState } from "react";

export function useClientsPaidQuery() {
  const [query, setQuery] = useState<any>({
    page: 1,
    limit: 10,
  });

  const updateQuery = (patch: any) => {
    setQuery((prev: any) => ({
      ...prev,
      ...patch,
      page: patch.page ? patch.page : 1,
    }));
  };

  const resetQuery = () => {
    setQuery({ page: 1, limit: 10 });
  };

  return {
    query,
    updateQuery,
    resetQuery,
  };
}
