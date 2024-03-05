import { Link, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import Button from "../common/Button";

const SortButton = ({ sort, setSort, role, param }) => {
  const handleChange = (event) => {
    setSort(event.target.value);
  };

  const { pathname } = useLocation();
  const loginStatus = JSON.parse(localStorage.getItem("login"));

  return (
    <Navigate>
      <Sort>
        <Sortcontainer>
          <Sortbox>
            <SortBtn
              isSelected={sort === "descending"}
              onClick={handleChange}
              value={"descending"}
            >
              최신순
            </SortBtn>
            <Sorticon>|</Sorticon>
            <SortBtn
              isSelected={sort === "ascending"}
              onClick={handleChange}
              value={"ascending"}
            >
              오래된 순
            </SortBtn>
          </Sortbox>
        </Sortcontainer>
        {loginStatus &&
          role === "MEMBER_UPCYCLER" &&
          (pathname === param ? (
            <Link to="/fundingcreate">
              <Button>펀딩 제품 등록</Button>
            </Link>
          ) : (
            <Link to={"/storecreate"}>
              <Button>스토어 제품 등록</Button>
            </Link>
          ))}
      </Sort>
    </Navigate>
  );
};

export default SortButton;

const Navigate = styled.div`
  display: flex;
  /* position: sticky; */
  background-color: #fff;
  width: 100%;
  /* top: 80px; */
  padding: 1rem 0;
`;

const Sort = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Sortcontainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

const Sortbox = styled.div`
  display: flex;
  height: 50%;
`;

const SortBtn = styled.button`
  background: none;
  border: none;
  margin-right: 5px;
  font-size: 16px;
  color: unset;
  ${(props) =>
    props.isSelected &&
    css`
      background: none;
      border: none;
      margin-right: 5px;
      font-size: 16px;
      font-weight: bold;
    `};
`;

const Sorticon = styled.div`
  color: rgba(220, 220, 220, 0.826);
  font-size: 15px;
`;
