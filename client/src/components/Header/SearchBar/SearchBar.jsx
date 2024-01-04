import React from "react";
import useSearch from "../../../hooks/useSearch";
import * as S from "./SearchBar.styled";

const SearchBar = ({ url, setSearchParam }) => {
  const [searchInput, setSearchInput, handleInputChange] = useSearch();

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      setSearchParam(searchInput);
      window.history.pushState("", null, `/${url}?serch=${searchInput}`);
    }
  };

  const handleSearch = () => {
    // 검색 버튼 클릭 시 수행할 작업
    // 검색어가 비어있지 않은 경우에만 URL 파라미터를 추가하도록 설정
    if (searchInput.trim() !== "") {
      setSearchParam(searchInput);
      window.history.pushState("", null, `/${url}?serch=${searchInput}`);
    }
  };

  const deleteSearch = () => {
    setSearchInput("");
    setSearchParam("");
    window.history.pushState("", null, `/${url}`);
  };

  return (
    <S.SeachContainer>
      <S.SearchInput
        placeholder="검색어를 입력하세요."
        type="text"
        value={searchInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      {searchInput ? <S.CloseBtn onClick={deleteSearch} /> : null}
      <S.VerticalLine />
      <S.SearchBtn onClick={handleSearch} />
    </S.SeachContainer>
  );
};

export default SearchBar;
