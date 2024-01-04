import styled from "styled-components";
import Input from "../../components/common/Input";

export const CreateFormContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const CreateFormWrapper = styled.form`
  display: flex;
  width: 62rem;
  flex-direction: column;
  margin: 3rem 0;
`;

export const TitleBox = styled.div`
  & h1 {
    color: var(--color-main);
  }
  & p {
    font-size: 0.9rem;
    margin-top: 0.5rem;
  }
`;

export const Label = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  margin: 1rem 0;
  & span {
    font-size: 18px;
    color: red;
    margin-left: 3px;
  }
`;

export const InputContainer = styled.div`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: 45rem 17rem;
  margin: 2rem 0;
`;

// Input fields style
export const StyledInput = styled(Input)`
  box-shadow: none;
  background-color: #ffffff9d;
  border: 1px solid #dde2e6;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 15rem;
  resize: none;
  box-sizing: border-box;
  background-color: #ffffff9d;
  border: 1px solid #dde2e6;
  border-radius: 5px;
  padding: 0.7rem;
  font-family: Arial, Helvetica, sans-serif;
`;

//tips style
export const TipBox = styled.div`
  /* width: 75%; */
  height: fit-content;
  background-color: #ebedef;
  border-radius: 3px;
  padding: 0.7rem;
  margin-top: 3.1rem;
  margin-left: 1rem;
  /* white-space: pre-line; */
  /* word-break: normal; */
  & p {
    font-size: 0.8rem;
    margin-top: 0.5rem;
  }
`;

export const ErrMsg = styled.p`
  width: fit-content;
  font-size: 0.85rem;
  color: red;
  margin-top: 0.5rem;
`;
