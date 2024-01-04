import { useRef, useState } from "react";
import { axiosInstance } from "../../api/axiosInstance";
import { styled } from "styled-components";
import Input from "./Input";

const ImgUploader = ({ setImgUrl }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const inputRef = useRef(null);

  const onUpload = (e) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0]; // 선택된 파일
    const reader = new FileReader(); // 파일을 읽기 위한 FileReader 객체 생성
    const formData = new FormData(); // 파일 데이터를 담을 FormData 객체 생성

    //이미지 크기 제한
    if (file.size > 1 * 1024 * 1024) {
      alert("이미지 크기가 1MB를 초과합니다. 다시 선택해주세요!!");
      return;
    }

    reader.readAsDataURL(file);
    formData.append("file", file); // FormData에 파일 추가

    return new Promise((resolve, reject) => {
      reader.onload = () => {
        // 파일 읽기가 완료되면 실행될 함수
        setImageSrc(reader.result || null); // 이미지 컨텐츠를 설정합니다.
        resolve();
      };

      reader.onerror = () => {
        // 파일 읽기 중에 오류가 발생한 경우 실행될 함수
        reject(new Error("파일을 읽는 도중 오류가 발생했습니다."));
      };

      axiosInstance({
        url: "/upload",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          setImgUrl(response.data);
          //   validateImgUrl(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  return (
    <>
      <ImgPreviewBox>
        {imageSrc ? (
          <img src={imageSrc} alt="펀딩 이미지 미리보기" />
        ) : (
          <p>+ 이미지를 추가해주세요.</p>
        )}
      </ImgPreviewBox>
      <ImgUploadBtn htmlFor="fileInput">파일 업로드</ImgUploadBtn>
      <Input
        type="file"
        accept="image/*"
        name="thumbNailImage"
        id="fileInput"
        ref={inputRef}
        onChange={onUpload}
        style={{ display: "none" }}
      />
    </>
  );
};

export default ImgUploader;

// Image uploader component style
const ImgPreviewBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #dde2e6;
  padding: 0.7rem;
  border-radius: 3px;
  & p {
    font-size: 0.85rem;
  }
  & img {
    max-width: 100%;
    max-height: 100%;
  }
`;
const ImgUploadBtn = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  margin-top: 1rem;

  color: #ffffff;
  background: #6e934d;
  border-radius: 5px;
  box-shadow: 3px 3px 6px rgba(95, 95, 95, 0.37);

  &:active {
    box-shadow: 1px 1px 3px rgba(95, 95, 95, 0.37);
  }
  &:hover {
    cursor: pointer;
  }
`;
