import { useState, useCallback } from "react";

const useInputs = (initialValue) => {
  const [form, setForm] = useState(initialValue);

  // const updateInputs = useCallback((newInputs) => {
  //   setForm((prevForm) => ({ ...prevForm, ...newInputs }));
  // }, []);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;

    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  // const reset = useCallback(() => setForm(initialValue), [initialValue]);

  return [form, onChange, setForm];
};

export default useInputs;
