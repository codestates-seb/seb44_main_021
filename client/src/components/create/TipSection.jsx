// TipSection.js
import React from "react";
import styled from "styled-components";
import { tips } from "../../constants/tips";

const TipSection = () => {
  return (
    <TipContainer>
      {tips.map((tip, index) => (
        <TipBox>
          <h5>{tip.title}</h5>
          {tip.content.map((paragraph, idx) => (
            <TipContent>{paragraph}</TipContent>
          ))}
        </TipBox>
      ))}
    </TipContainer>
  );
};

export default TipSection;

const TipContainer = styled.div`
  width: 30%;
  /* display: flex;
  flex-direction: column;
  align-items: flex-end; */
`;

const TipBox = styled.div`
  /* width: 75%; */
  height: fit-content;
  background-color: #ebedef;
  border-radius: 3px;
  padding: 10px;
  margin: 3rem;
  white-space: pre-line;
  word-break: normal;
  margin-top: 110px;
`;

const TipContent = styled.p`
  font-size: 12px;
  margin-top: 5px;
`;
