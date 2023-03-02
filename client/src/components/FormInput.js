import React from 'react'

const FormInput = ({name, type, value, handleChange, labelText, errorMessage}) => {
  return (
    <div>
      <label htmlFor={name}>{labelText || name}</label>
      <input type={type} value={value} name={name} onChange={handleChange}></input>
      {errorMessage && <span>{errorMessage}</span>}
    </div>
  )
}

export default FormInput