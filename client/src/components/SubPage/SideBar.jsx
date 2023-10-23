import styled, { css } from "styled-components";

const Banner = ({ kategorie, setKategorie, menu }) => {
  const SideBtn = (kategorieNum) => {
    if (kategorie !== kategorieNum) {
      setKategorie(kategorieNum);
      window.scrollTo(0, 0);
    }
  };

  return (
    <Aside>
      <Kategorie>카테고리</Kategorie>
      {menu.map((obj, idx) => (
        <Button
          kategorieIdx={idx}
          kategorie={kategorie}
          onClick={() => SideBtn(idx)}
        >
          {obj}
        </Button>
      ))}
    </Aside>
  );
};

export default Banner;

const Aside = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 15%;
  height: 400px;
  position: sticky;
  top: 72px;
  margin-top: 30px;
  margin-bottom: calc(90vh - 400px);
`;

const Kategorie = styled.div`
  font-size: 25px;
  padding-bottom: 10px;
  border-bottom: 1px solid #6e934d;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
  ${(props) =>
    props.kategorieIdx === props.kategorie &&
    css`
      width: fit-content;
      border-bottom: 2px solid #6e934d;
      padding: 10px 0;
    `};
`;
