import { useState } from "react";
import Style from "./EditModal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const EditModal = ({ onClose, userData }) => {
  const [editUserInfo, setEditUserInfo] = useState({
    displayName: userData.displayName,
    password: "",
    verifyPwd: "",
    thumbNailImage: "",
  });
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwdErrMsg, setNewPwdErrMsg] = useState("");
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  const EditInputValue = (key) => (e) => {
    setEditUserInfo({ ...editUserInfo, [key]: e.target.value });
    console.log(editUserInfo);
  };

  // 새비밀번호 유효성 검사
  const PWD_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
  const IsValidPwd = () => {
    if (!PWD_REGEX.test(editUserInfo.password)) {
      setNewPwdErrMsg("숫자 ,문자, 특수문자 포함 8자 이상 입력하세요.");
      setIsPassword(false);
    } else if (editUserInfo.password !== editUserInfo.verifyPwd) {
      setNewPwdErrMsg("새 비밀번호와 일치하지 않습니다.");
      setIsPassword(false);
    } else {
      setNewPwdErrMsg("");
      setIsPassword(true);
    }
  };

  // console.log(editUserInfo);

  const AxiosPatch = (e) => {
    e.preventDefault();
    const { displayName, password, thumbNailImage } = editUserInfo;

    if (isPassword || displayName || thumbNailImage) {
      axios
        .patch(`/members/${userData.memberId}`, {
          displayName,
          password,
          thumbNailImage,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      onClose();
    }
  };

  const AxiosCurrentPwd = (e) => {
    e.preventDefault();
    axios
      .post(`/members/verifiedpassword`, {
        memberId: userData.memberId,
        password: currentPwd,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data === "성공") {
          setIsPasswordVerified(true);
        }
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    onClose();
  };

  return (
    <div id={Style.modalContainer}>
      {!isPasswordVerified && (
        <div className={Style.modalWrapper}>
          <CloseIcon className={Style.closeIcon} onClick={onClose} />
          <div className={Style.modalContent}>
            <label>현재 비밀번호</label>
            <input
              type="password"
              onChange={(e) => {
                setCurrentPwd(e.target.value);
                console.log(currentPwd);
              }}
            />
          </div>
          <button className={Style.editButton} onClick={AxiosCurrentPwd}>
            Edit
          </button>
        </div>
      )}
      {isPasswordVerified && (
        <div className={Style.modalWrapper}>
          <CloseIcon className={Style.closeIcon} onClick={onClose} />
          <SettingUserThumbnail
            setEditUserInfo={setEditUserInfo}
            editUserInfo={editUserInfo}
          />
          <div className={Style.modalContent}>
            <label>
              {userData.memberRole === "MEMBER_USER" && "닉네임"}
              {userData.memberRole === "MEMBER_UPCYCLER" && "업사이클러"}
            </label>
            <input
              type="text"
              defaultValue={userData.displayName}
              onChange={EditInputValue("username")}
            />
            <label>이메일</label>
            <p>{userData.email}</p>
            <label>새 비밀번호</label>
            <input
              type="password"
              onChange={EditInputValue("password")}
              onBlur={IsValidPwd}
            />
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
      )}
      <div className={Style.modalLayer} onClick={onClose}></div>
    </div>
  );
};

export default EditModal;

const SettingUserThumbnail = ({ setEditUserInfo, editUserInfo }) => {
  const [imageSrc, setImageSrc] = useState(
    `${process.env.PUBLIC_URL}/image/profile.jpeg`
  );
  // const inputRef = useRef(null);

  const onUpload = (e) => {
    if (!e.target.files) {
      return;
    }

    const file = e.target.files[0]; // 선택된 파일
    const reader = new FileReader(); // 파일을 읽기 위한 FileReader 객체 생성
    const formData = new FormData(); // 파일 데이터를 담을 FormData 객체 생성

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

      axios({
        url: "/upload",
        method: "POST",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then((response) => {
          const updatedUserInfo = {
            ...editUserInfo,
            thumbNailImage: response.data,
          };
          setEditUserInfo(updatedUserInfo);
          console.log(updatedUserInfo);
          console.log(response.data);
          console.log(formData);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  return (
    <div id={Style.imgContainer}>
      <div className={Style.imgUpload}>
        <label htmlFor="fileInput">
          <img
            className={Style.userImg}
            src={imageSrc}
            // src={`${process.env.PUBLIC_URL}/image/profile.jpeg`}
            alt="profile-img"
          />
          <img
            className={Style.uploadIcon}
            src={`${process.env.PUBLIC_URL}/image/add-img-icon.png`}
            alt="add-img-icon"
          />
        </label>
      </div>

      <input
        type="file"
        accept="image/*"
        name="file"
        id="fileInput"
        onChange={onUpload}
        style={{ display: "none" }}
      />
    </div>
  );
};
