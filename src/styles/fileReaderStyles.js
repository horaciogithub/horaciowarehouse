import { makeStyles } from "@material-ui/core/styles";

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

export default chooserStyles;