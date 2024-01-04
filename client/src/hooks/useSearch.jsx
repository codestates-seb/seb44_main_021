import { useState, useCallback } from "react";

const useSearch = () => {
  const urlParams = new URL(window.location.href).searchParams;
  const serch = urlParams.get("serch");
  const [searchInput, setSearchInput] = useState(serch);

  const handleInputChange = useCallback((e) => {
    setSearchInput(e.target.value);
  }, []);

  return [searchInput, setSearchInput, handleInputChange];
};

export default useSearch;
