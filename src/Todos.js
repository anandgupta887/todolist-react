import React, { useState } from "react";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Input,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import DeleteIcon from "@material-ui/icons/Delete";
import db from "./firebase";
import firebase from "firebase";
import EditIcon from "@material-ui/icons/Edit";
import "./Todos.css";

function Todos(props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const updateTodo = (event) => {
    event.preventDefault();
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

  const handleExit = () => {
    setOpen(false);
  };

  return (
    <div className="Todos">
      <List className="Todos__list">
        {open && (
          <div open={open} onClose={(e) => setOpen(false)}>
            <ListItem>
              <form>
                <h1>Change text</h1>
                <FormControl>
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    autoFocus
                  />
                  <FormHelperText id="my-helper-text">Item</FormHelperText>
                </FormControl>
                <Button disabled={!input} onClick={updateTodo} type="submit">
                  <AssignmentTurnedInIcon />
                </Button>
                <Button onClick={handleExit}>
                  <ExitToAppIcon />
                </Button>
              </form>
            </ListItem>
          </div>
        )}
        {!open && (
          <div>
            <ListItem>
              <ListItemText
                primary={props.text}
                secondary="Be consistent!!!!"
              />
              <Button onClick={handleEdit}>
                <EditIcon />
              </Button>
              <Button
                onClick={(event) =>
                  db.collection("items").doc(props.id).delete()
                }
              >
                <DeleteIcon />
              </Button>
            </ListItem>
          </div>
        )}
      </List>
    </div>
  );
}

export default Todos;
