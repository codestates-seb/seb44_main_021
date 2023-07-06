import React from "react";
import Style from "./EditModal.module.css";

const EditModal = ({ onClose }) => {
  return (
    <div id={Style.modalContainer}>
      <div className={Style.modalWrapper}>
        <div className={Style.imgUpload}>
          <img
            className={Style.userImg}
            src={`${process.env.PUBLIC_URL}/image/profile.jpeg`}
            alt="profile-img"
          />
          <img
            className={Style.uploadIcon}
            src={`${process.env.PUBLIC_URL}/image/add-img-icon.png`}
            alt="add-img-icon"
          />
        </div>
        <div className={Style.modalContent}>
          <p className={Style.edit}>닉네임</p>
          <input type="text" />
          <label>이메일</label>
          <p>yejin123@gmail.com</p>
          <label>현재 비밀번호</label>
          <input type="password" />
          <label>새 비밀번호</label>
          <input type="password" />
          <label>새 비밀번호 확인</label>
          <input type="password" />
        </div>
        <button className={Style.editButton} onClick={onClose}>
          Edit
        </button>
      </div>
      <div className={Style.modalLayer} onClick={onClose}></div>
    </div>
  );
};

export default EditModal;
