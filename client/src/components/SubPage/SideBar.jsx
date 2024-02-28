import styled, { css } from "styled-components";

const SideBar = ({ kategorie, setKategorie, menu }) => {
  const SideBtn = (kategorieNum) => {
    if (kategorie !== kategorieNum) {
      setKategorie(kategorieNum);
      window.scrollTo(0, 0);
    }
  };

  return (
    <Aside>
      <Kategorie>카테고리</Kategorie>
      <CartegoryList>
        {menu.map((obj, idx) => (
          <ListItem
            className={idx === kategorie ? "selected" : "underline-effect"}
            kategorieIdx={idx}
            kategorie={kategorie}
            onClick={() => SideBtn(idx)}
          >
            {obj}
          </ListItem>
        ))}
      </CartegoryList>
    </Aside>
  );
};

export default SideBar;

const Aside = styled.aside`
  /* align-items: center; */

  width: 100%;
  height: 300px;
  position: sticky;
  background-color: #fff;
  top: 80px;
  padding-top: 80px;
  margin-bottom: calc(90vh - 400px);

  @media (max-width: 768px) {
    padding: 0;
    margin: 0;
    height: 100%;
    padding: 1rem;
  }
`;

const Kategorie = styled.div`
  font-size: 1.5rem;
  padding-bottom: 1.5rem;
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CartegoryList = styled.ul`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
`;
const ListItem = styled.li`
  font-size: 1rem;

  ${(props) =>
    props.className === "selected" &&
    css`
      text-decoration: underline;
      text-underline-offset: 0.5rem;
      text-decoration-color: #c0d6b1;
      text-decoration-thickness: 3px;
    `}
  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;
