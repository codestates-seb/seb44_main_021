import styled from "styled-components";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";

function NotFound() {
  return (
    <NotfoundSection>
      <div>
        <span className="notfound_404">404</span>
        <span className="notfound_state">페이지를 찾을 수 없습니다.</span>
        <span className="notfound_text">
          페이지가 존재하지 않거나, 사용할 수 없는 페이지 입니다.
        </span>
        <Link to="/">
          <Button> 돌아가기</Button>
        </Link>
      </div>
    </NotfoundSection>
  );
}

export default NotFound;

const NotfoundSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    opacity: 0;
    animation: opacity 2s ease forwards;
  }
  @keyframes opacity {
    100% {
      opacity: 1;
    }
  }
  .notfound_404 {
    font-size: 8rem;
    font-weight: 800;
    color: #6e934d;
  }

  .notfound_state {
    font-size: 1.4em;
    color: #828282;
  }
  .notfound_text {
    font-size: 1em;
    color: #828282;
    line-height: 150%;
  }
`;
