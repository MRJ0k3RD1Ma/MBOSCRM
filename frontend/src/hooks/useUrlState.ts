import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function useUrlState() {
    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;
    const search = searchParams.get("search") || "";

    // Parse filters from URL params (excluding known keys)
    const getFilters = () => {
        const params: Record<string, string> = {};
        for (const [key, value] of searchParams.entries()) {
            if (key !== "page" && key !== "search" && value) {
                params[key] = value;
            }
        }
        return params;
    };

    const filters = getFilters();

    // Local search state to handle typing without updating URL immediately
    const [localSearch, setLocalSearch] = useState(search);

    // Sync local search with URL param (e.g. on Back button)
    useEffect(() => {
        setLocalSearch(search);
    }, [search]);

    // Helper to update params cleanly
    const updateParams = (
        newParams: Record<string, string | number | undefined | null>
    ) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            Object.entries(newParams).forEach(([key, value]) => {
                if (value === undefined || value === null || value === "") {
                    next.delete(key);
                } else {
                    next.set(key, String(value));
                }
            });
            return next;
        });
    };

    const handleSearch = (val: string) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            if (val) next.set("search", val);
            else next.delete("search");
            next.set("page", "1"); // Reset to page 1 on search
            return next;
        });
    };

    const setPage = (newPage: number) => {
        updateParams({ page: newPage });
    };

    const handleFilterApply = (values: Record<string, any>) => {
        setSearchParams((prev) => {
            const next = new URLSearchParams();
            // Keep search
            const currentSearch = prev.get("search");
            if (currentSearch) next.set("search", currentSearch);

            // Reset page
            next.set("page", "1");

            // Add new filters
            Object.entries(values).forEach(([key, value]) => {
                if (value) next.set(key, String(value));
            });

            return next;
        });
    };

    return {
        page,
        search,
        localSearch,
        setLocalSearch,
        filters,
        setPage,
        handleSearch,
        handleFilterApply,
    };
}
