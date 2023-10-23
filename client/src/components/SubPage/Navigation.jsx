import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const Navigation = ({ sort, setSort, role, link }) => {
  const handleChange = (event) => {
    setSort(event.target.value);
  };

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
        {role === "MEMBER_UPCYCLER" ? (
          <Link to={link}>
            <LinkBtn>펀딩 제품 등록</LinkBtn>
          </Link>
        ) : null}
      </Sort>
    </Navigate>
  );
};

export default Navigation;

const Navigate = styled.div`
  display: flex;
  width: 70%;
  margin-left: 25%;
`;

const Sort = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin-top: 40px;
  height: 30px;
  margin-bottom: 20px;
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

const LinkBtn = styled.button`
  background-color: #6e934d;
  border: none;
  border-radius: 10px;
  padding: 15px;
  text-align: left;
  cursor: pointer;
  color: #fff;

  :hover {
    background-color: #6e934d91;
    border-radius: 10px;
    padding: 15px;
    text-align: left;
    cursor: pointer;
    color: #fff;
  }
`;
