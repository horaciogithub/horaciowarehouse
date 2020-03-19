import React from "react";

const SelectControl = props => {

  return (
    <select name="ref" onChange={props.changeRefHandler}>
      <option>{props.reference}</option>
      {/* {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))} */}
    </select>
  );
};

export default SelectControl;
