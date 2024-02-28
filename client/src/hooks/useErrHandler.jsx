import { useState, useCallback } from "react";

const useErrHandler = () => {
  const [errMsgObj, setErrMsgObj] = useState({});

  const handleValidation = useCallback((e, validations) => {
    const { name, value } = e.target;

    const errorMessage = validations[name] && validations[name](value);

    setErrMsgObj((prev) => ({ ...prev, [name]: errorMessage }));
  }, []);

  const handleInputErr = useCallback((name, err) => {
    // const { name } = e.target;
    setErrMsgObj((prev) => ({ ...prev, [name]: err }));
  }, []);

  return {
    handleValidation,
    handleInputErr,
    errMsgObj,
  };
};

export default useErrHandler;
