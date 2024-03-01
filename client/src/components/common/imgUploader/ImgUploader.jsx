import React, { useState } from "react";
import { axiosInstance } from "../../../api/axiosInstance";
import ImgPreview from "./ImgPreview";
import ImgUploadBtn from "./ImgUploadBtn";
import styled from "styled-components";
import { useSelector } from "react-redux";

const ImgUploader = React.memo(({ onChange, purpose = "", ...att }) => {
  const userData = useSelector((state) => state.userData);
  const [imgPreviewSrc, setImgPreviewSrc] = useState(() => {
    if (purpose === "profile") {
      return (
        userData.thumbNailImage ||
        `${process.env.PUBLIC_URL}/image/profile.webp`
      );
    } else {
      return null;
    }
  });
  const [fileName, setFileName] = useState("파일을 선택해 주세요.");
  // const inputRef = useRef(null);

  const onUpload = async (e) => {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0]; // 선택된 파일
    const reader = new FileReader(); // 파일을 읽기 위한 FileReader 객체 생성
    const formData = new FormData(); // 파일 데이터를 담을 FormData 객체 생성
    setFileName(file.name);

    if (file.size > 1 * 1024 * 1024) {
      setFileName("파일을 선택해 주세요.");
      alert("이미지 크기가 1MB를 초과합니다. 다시 선택해주세요!");
      return;
    }

    reader.readAsDataURL(file);
    formData.append("file", file);

    try {
      await readerLoadPromise(reader);
      const response = await axiosInstance({
        url: "/upload",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onChange({ target: { name: att.name, value: response.data } });
    } catch (error) {
      console.error(error);
    }
  };

  const readerLoadPromise = (reader) => {
    return new Promise((resolve, reject) => {
      reader.onload = () => {
        setImgPreviewSrc(reader.result || null);
        resolve();
      };
      reader.onerror = () =>
        reject(new Error("파일을 읽는 도중 오류가 발생했습니다."));
    });
  };

  return (
    <ImgUploaderWrapper purpose={purpose}>
      <ImgUploadBtn name={att.name} fileName={fileName} purpose={purpose} />
      <input
        type="file"
        accept="image/*"
        name={att.name}
        id={`fileInput_${att.name}`}
        onChange={onUpload}
        style={{ display: "none" }}
      />
      <ImgPreview
        imageSrc={imgPreviewSrc}
        fileName={fileName}
        purpose={purpose}
      />
    </ImgUploaderWrapper>
  );
});

export default ImgUploader;
const ImgUploaderWrapper = styled.div`
  ${({ purpose }) =>
    purpose === "profile"
      ? `
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;`
      : `
      display: flex;
      flex-direction: column;
      justify-content: center;
`}
`;
