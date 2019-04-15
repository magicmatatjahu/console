import { useState, useEffect } from "react";

export const useInput = (initialValue: string, validate?: (value: string) => string, initialError: string = "") => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(initialError);

  return {
    value,
    error,
    setValue,
    resetValue: () => setValue(""),
    resetError: () => setError(""),
    bind: {
      value,
      onChange: (event: any) => {
        const value: string = event.target.value;
        setValue(value);
        validate && setError(validate(value))
      }
    }
  };
};