import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import db from "./firebase";
import EditIcon from "@material-ui/icons/Edit";
import "./Todos.css";

function Todos(props) {
  return (
    <List className="todos__list">
      <ListItem>
        {/* <ListItemAvatar></ListItemAvatar> */}
        <ListItemText primary={props.text} secondary="Be consistent!!!!" />
        <EditIcon />
        <DeleteIcon
          onClick={(event) => db.collection("items").doc(props.id).delete()}
        />
      </ListItem>
    </List>
  );
}

export default Todos;
