import React from "react";
import { Button } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import fileReaderStyles from '../../styles/fileReaderStyles';

const FileReader = props => {
    const classes = fileReaderStyles();

  return (
    <div className={classes.chooserContainer}>
      <input className={classes.chooser} id="contained-button-file" type="file"  onChange={ props.onCreate } />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          className={classes.button}
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Subir archivo
        </Button>
      </label>
    </div>
  );
};
export default FileReader;