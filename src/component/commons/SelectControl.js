import React from "react";

const SelectControl = props => {

  const options = props.options.filter(ref => ref !== props.reference)

  return (
    <select name="ref" onChange={(e) => props.changeField(e)}>
      <option>{props.reference}</option>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default SelectControl;
