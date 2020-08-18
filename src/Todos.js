import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Modal,
  Button,
  Input,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import db from "./firebase";
import firebase from "firebase";
import EditIcon from "@material-ui/icons/Edit";
import "./Todos.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todos(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const updateTodo = () => {
    db.collection("items").doc(props.id).set(
      {
        item: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
    setOpen(false);
  };

  const handleEdit = () => {
    setInput(props.text);
    setOpen(true);
  };

  return (
    <div className="Todos">
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className="Todos__modal">
          <div className={classes.paper}>
            <form>
              <h1>Change the item</h1>
              <Input value={input} onChange={(e) => setInput(e.target.value)} />
              <Button onClick={updateTodo} type="submit">
                Update Todo
              </Button>
            </form>
          </div>
        </div>
      </Modal>
      <List className="Todos__list">
        <ListItem>
          <ListItemText primary={props.text} secondary="Be consistent!!!!" />
        </ListItem>
        <EditIcon onClick={handleEdit} />
        <DeleteIcon
          onClick={(event) => db.collection("items").doc(props.id).delete()}
        />
      </List>
    </div>
  );
}

export default Todos;
