import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

const chooserStyles = makeStyles(theme => ({
  chooserContainer: {
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  chooser: {
    display: "none"
  },
  button: {
    backgroundColor: "#f50057",
    color: "#ffffff"
  }
}));

export default function fileReader(props) {
    const classes = chooserStyles();

  return (
    <div className={classes.chooserContainer}>
      <input className={classes.chooser} id="contained-button-file" type="file"  onChange={ props.showFile } />
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