import React from "react";
import useSearch from "../../../hooks/useSearch";
import * as S from "./SearchBar.styled";
import { useDispatch } from "react-redux";
import { setSearchWord } from "../../../store/slice/searchSlice";
import { useNavigate } from "react-router-dom";
import Input from "../../common/Input";

const SearchBar = ({ pathname }) => {
  const [searchInput, setSearchInput, handleInputChange] = useSearch();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      // setSearchParam(searchInput);
      dispatch(setSearchWord(searchInput));
      // window.history.pushState("", null, `/${url}?serch=${searchInput}`);
      navigate(`${pathname}?serch=${searchInput}`);
    }
  };

  const handleSearch = () => {
    // 검색 버튼 클릭 시 수행할 작업
    // 검색어가 비어있지 않은 경우에만 URL 파라미터를 추가하도록 설정
    if (searchInput.trim() !== "") {
      dispatch(setSearchWord(searchInput));
      navigate(`${pathname}?serch=${searchInput}`);
    }
  };

  const deleteSearch = () => {
    setSearchInput("");
    dispatch(setSearchWord(""));
    navigate(`${pathname}`);
  };

  return (
    <S.SeachContainer>
      <input
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
