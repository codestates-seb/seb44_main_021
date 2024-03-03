import styled from "styled-components";

const ImgUploadButton = ({ fileName, name, purpose }) => {
  return (
    <>
      {purpose === "profile" ? (
        <label htmlFor={`fileInput_${name}`}>
          <UploadIcon
            src={`${process.env.PUBLIC_URL}/image/add-img-icon.png`}
            alt="add-img-icon"
            htmlFor={`fileInput_${name}`}
          />
        </label>
      ) : (
        <ImgUploadBtn $fileName={fileName}>
          <label htmlFor={`fileInput_${name}`}>🔗 FILE UPLOAD</label>
          {fileName && <p className="file-name">{fileName}</p>}
        </ImgUploadBtn>
      )}
    </>
  );
};

export default ImgUploadButton;
const ImgUploadBtn = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-bottom: 0.6rem;
  & > * {
    font-size: 0.85rem;
  }
  & > p {
    color: ${({ $fileName }) =>
      $fileName === "파일을 선택해 주세요." && "#777"};
    margin-left: 0.5rem;
  }
  & > label {
    text-align: center;
    width: fit-content;
    padding: 10px;
    color: #fff;
    background: var(--color-main);
    border-radius: 5px;
    transition: all 0.2s ease-in-out;
    box-shadow: var(--shadow-btn);
    cursor: pointer;
    &:hover {
      box-shadow: var(--shadow-btn-hover);
    }

    &:active {
      box-shadow: var(--shadow-btn-active);
    }
  }
`;
const UploadIcon = styled.img`
  width: 30px;
  height: 30px;
  color: rgb(95, 148, 49);
  position: absolute;
  top: 80px;
  right: 60px;
  z-index: 2;
  cursor: pointer;
`;
