import React, { ChangeEvent, useState } from "react";

export type TForm = {
  [key: string]: string;
}

function useForm(inputValues: TForm) {
  const [values, setValues] = useState(inputValues);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value, name } = event.target;
    setValues({ [name]: value, ...values });
  };
  return { values, handleChange, setValues };
}

export default useForm;
