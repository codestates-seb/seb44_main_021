import styled from "styled-components";

const TipSection = ({ children }) => {
  return (
    <TipBox>
      <p className="tip-title">{children.title}</p>
      {children.content.map((paragraph, idx) => (
        <p className="tip-content" key={idx}>
          {paragraph}
        </p>
      ))}
    </TipBox>
  );
};

export default TipSection;

const TipBox = styled.div`
  height: fit-content;
  background-color: #ebedef;
  border-radius: 5px;
  padding: 0.9rem;
  margin-top: 2rem;
  margin-left: 3rem;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    margin-left: 0;
  }
  .tip-title {
    font-weight: bold;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }
  .tip-content {
    font-size: 0.8rem;
    margin-top: 0.45rem;
  }
`;
