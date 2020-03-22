import React, { useState, useEffect } from "react";
import Select from "@material-ui/core/Select";
import { MenuItem } from "@material-ui/core";

const SelectControl = props => {
  const [optionsRef, setOptionRef] = useState([]);
  const [reference, setReference] = useState('');

  const handleChange = e => {
    setReference(e.target.value);
    props.change(e.target.value)
  };

  useEffect(() => {
    let references = [];
    let i = -1;

    props.data.map(item => {
      return (references[i++] = item.ref);
    });
    setOptionRef([...new Set(references)]);
  }, [props]);

  return optionsRef !== undefined ? (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={reference}
      onChange={handleChange}
    >
      {optionsRef.map(option => (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      ))}
    </Select>
  ) : null;
};

export default SelectControl;