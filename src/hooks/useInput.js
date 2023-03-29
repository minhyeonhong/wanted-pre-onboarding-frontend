import { useState } from 'react';

const useInput = (init = {}) => {
  const [value, setValue] = useState(init);

  const valueSetValue = e => {
    setValue({ ...e });
  };

  const handler = e => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  return [value, valueSetValue, handler];
};

export default useInput;
