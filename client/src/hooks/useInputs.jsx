import { useState, useCallback } from "react";

const useInputs = (initialValue) => {
  const [form, setForm] = useState(initialValue);

  const onChange = useCallback((e) => {
    const { name, value } = e.target;

    setForm((form) => ({ ...form, [name]: value }));
  }, []);

  // const reset = useCallback(() => setForm(initialValue), [initialValue]);

  return [form, onChange];
};

export default useInputs;
