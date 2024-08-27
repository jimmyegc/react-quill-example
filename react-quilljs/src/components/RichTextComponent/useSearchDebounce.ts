import { useEffect, useState } from "react";

export const useSearchDebounce = (delay = 350) => {
    const [search, setSearch] = useState(null);
    const [searchQuery, setSearchQuery] = useState(null);
  
    useEffect(() => {
      const delayFn = setTimeout(() => setSearch(searchQuery), delay);
      return () => clearTimeout(delayFn);
    }, [searchQuery, delay]);
  
    return [search, setSearchQuery];
};