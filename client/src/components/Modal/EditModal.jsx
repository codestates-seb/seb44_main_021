import { useState } from "react";
import Style from "./EditModal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const EditModal = ({ onClose, userData }) => {
  const [editUserInfo, setEditUserInfo] = useState({
    username: userData.displayName,
    password: "",
    verifyPwd: "",
  });
  const [newPwdErrMsg, setNewPwdErrMsg] = useState("");

  const EditInputValue = (key) => (e) => {
    setEditUserInfo({ ...editUserInfo, [key]: e.target.value });
    console.log(editUserInfo);
  };

  const IsValidPwd = () => {
    if (editUserInfo.password !== editUserInfo.verifyPwd) {
      setNewPwdErrMsg("새 비밀번호와 일치하지 않습니다.");
    } else {
      setNewPwdErrMsg("");
    }
  };

  // console.log(editUserInfo);
  const AxiosPatch = (e) => {
    e.preventDefault();
    const { username, password } = editUserInfo;

    if (newPwdErrMsg === "") {
      axios
        .patch(`/members/${userData.memberId}`, { username, password })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      onClose();
    }
  };

  return (
    <div id={Style.modalContainer}>
      <div className={Style.modalWrapper}>
        <CloseIcon className={Style.closeIcon} onClick={onClose} />
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
          <label>닉네임</label>
          <input
            type="text"
            defaultValue={userData.displayName}
            onChange={EditInputValue("username")}
          />
          <label>이메일</label>
          <p>{userData.email}</p>
          <label>현재 비밀번호</label>
          <input type="password" />
          <label>새 비밀번호</label>
          <input type="password" onChange={EditInputValue("password")} />
          <label>새 비밀번호 확인</label>
          <input
            type="password"
            onChange={EditInputValue("verifyPwd")}
            onBlur={IsValidPwd}
          />
          {newPwdErrMsg && <p className={Style.errMsg}>{newPwdErrMsg}</p>}
        </div>
        <button className={Style.editButton} onClick={AxiosPatch}>
          Edit
        </button>
      </div>
      <div className={Style.modalLayer} onClick={onClose}></div>
    </div>
  );
};

export default EditModal;
