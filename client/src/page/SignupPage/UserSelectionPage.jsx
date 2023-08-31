import Style from "./UserSelectionPage.module.css";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useNavigate } from "react-router-dom";
import UserSelectionForm from "../../components/forms/UserSelectionForm";
import CommonForm from "../../components/forms/CommonForm";
const UserSelectionPage = () => {
  const navigate = useNavigate();

  const handleClickButton = (el) => {
    navigate(`/signup/${el}`);
  };

  return (
    <CommonForm>
      <UserSelectionForm />
    </CommonForm>
  );
};

export default UserSelectionPage;
