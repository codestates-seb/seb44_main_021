import React from "react";
import { useParams } from "react-router-dom";
import SignupForm from "../../components/forms/SignupForm";
import CommonForm from "../../components/forms/CommonForm";

const SignupPage = () => {
  const { role } = useParams();

  return (
    <CommonForm>
      <SignupForm role={role} />
    </CommonForm>
  );
};

export default SignupPage;
