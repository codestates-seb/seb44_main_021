import { useState, useCallback } from "react";

const useErrHandler = () => {
  const [errMsgObj, setErrMsgObj] = useState({});

  const handleInputErr = useCallback((e, validations) => {
    const { name, value } = e.target;

    const errorMessage = validations[name] && validations[name](value);

    setErrMsgObj((prev) => ({ ...prev, [name]: errorMessage }));
  }, []);

  const handleInputError = useCallback((name, err) => {
    // const { name } = e.target;
    setErrMsgObj((prev) => ({ ...prev, [name]: err }));
  }, []);

  return {
    handleInputError,
    handleInputErr,
    errMsgObj,
  };
};

export default useErrHandler;
