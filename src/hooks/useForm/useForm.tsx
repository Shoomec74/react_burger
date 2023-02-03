import React, {useState} from 'react';

interface Form {
  email?: string,
  password?: string,
  name?: string,
  token?: string
}

function useForm(inputValues : Form ) {
  const [values, setValues] = useState<Form>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const {value, name} = event.target;
    setValues({[name]: value, ...values});
  };
  return {values, handleChange, setValues};
}

export default useForm;
