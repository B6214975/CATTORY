import React from 'react'
import { useState } from "react";

const Register_Input = (props) => {

    const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;
// console.log(inputProps)
  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="">
      <label className="form-label">{label}</label>
      <input
      className="form-control mb-3"
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span>{errorMessage}</span>
    </div>

  )
}

export default Register_Input