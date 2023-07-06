import React from "react";
// import Style from "./SignupPage.module.css";
import SignupForm from "../components/Signup/SignupForm";

const SignupPage = ({ userName }) => {
  return (
    <div>
      <SignupForm userName={userName} />
    </div>
  );
};

export default SignupPage;
