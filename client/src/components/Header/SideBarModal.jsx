import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { HiOutlineMenu } from "react-icons/hi";
import useModal from "../../hooks/useModal";

const sideLink = [
  { url: "/funding", menu: "펀딩+" },
  { url: "/store", menu: "스토어" },
  { url: "/about", menu: "About" },
];
const SideBarModal = () => {
  const navigate = useNavigate();
  const { isOpenModal, isUnmount, openModal, closeModal } = useModal();

  const handleMovePage = (url) => {
    closeModal();
    return navigate(url);
  };

  return (
    <>
      <MenuBtn aria-label="menu-button" className="SideBar__Menu-btn">
        <HiOutlineMenu onClick={openModal} />
      </MenuBtn>
      {isOpenModal ? (
        <>
          <ModalContent isUnmount={isUnmount}>
            <img
              className="logo"
              src={process.env.PUBLIC_URL + "/image/logo1.png"}
              alt="ieun-logo"
            />
            <Closebutton onClick={closeModal} />
            <Sidelist>
              {sideLink.map((item, idx) => (
                <li
                  key={idx}
                  className="underline-effect"
                  onClick={() => handleMovePage(item.url)}
                >
                  {item.menu}
                </li>
              ))}
            </Sidelist>
            <TeamName>IEUN CO.</TeamName>
          </ModalContent>
          <ModalOverlay onClick={closeModal} />
        </>
      ) : null}
    </>
  );
};

export default SideBarModal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
`;

const openModal = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0px);
  }
`;

const closeModal = keyframes`
  /* 0% {
    margin-top: 0px;
  } */
  100% {
    transform: translateX(-100%);
  }
`;

const ModalContent = styled.aside`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f5f5f5;
  top: 0;
  left: 0;
  height: 100vh;
  width: 50vh;
  z-index: 2;
  animation: ${({ isUnmount }) => {
      if (isUnmount === true) {
        return closeModal;
      } else {
        return openModal;
      }
    }}
    1.2s forwards;
  > .logo {
    margin-top: 10px;
    width: 60px;
    height: 60px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Closebutton = styled(CloseIcon)`
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 20px;
  cursor: pointer;
  position: absolute;
  top: 1px;
  right: 1px;
`;

const Sidelist = styled.nav`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  li {
    font-size: 1.3rem;
  }
`;

const TeamName = styled.p`
  font-family: "Montserrat", sans-serif;
  position: absolute;
  bottom: 50px;
  font-size: 1.5rem;
  color: #353535;
  font-weight: 700;
  letter-spacing: 10px;
  &::first-letter {
    color: var(--color-main);
  }
`;

const MenuBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  /* padding: 1rem; */
  svg {
    color: var(--color-main);
    font-size: 1.8rem;
  }
`;
