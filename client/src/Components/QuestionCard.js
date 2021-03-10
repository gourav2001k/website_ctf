import React from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Grow from "@material-ui/core/Grow";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
    minWidth: 250,
    opacity: 0.8,
    transitionProperty: "width",
    "&:hover": {
      width: 300,
      opacity: 1,
      transform: "scale3d(1.1, 1.1, 1.1)",
    },
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  textfield: {
    width: 100,
  },
  pointss: {
    // position: "relative",
    display: "flex",
    width: 70,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  questiontitle: {
    position: "relative",
  },
}));

export default function QuestionCard(props) {
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      style={{ width: props.width, height: props.height }}
      variant="outlined"
    >
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            className={classes.questiontitle}
            variant="body2"
            // component="p"
          >
            {props.title}
          </Typography>
          <Chip className={classes.pointss} label={props.points} />
        </div>
        <div className={classes.pos} color="textSecondary">
          {props.category.map((c) => (
            <Chip key={c} label={c} style={{ margin: "3px" }} />
          ))}
        </div>
        <Typography variant="body2">{props.statement}</Typography>
        {props.fileURL && (
          <Button variant="contained">
            <a
              href={`http://localhost:5000/uploads/${props.fileURL}`}
              className="links"
            >
              File
            </a>
          </Button>
        )}
      </CardContent>
      <CardActions>
        <form className={classes.textfield} noValidate autoComplete="off">
          <TextField id="filled-basic" label="Answer" variant="filled" />
        </form>
        <Button style={{ marginLeft: 100 }} variant="contained">
          Submit
        </Button>
      </CardActions>
    </Card>
  );
}
