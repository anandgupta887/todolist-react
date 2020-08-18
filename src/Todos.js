import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";

function Todos(props) {
  return (
    <div>
      <List>
        <ListItem>
          <ListItemText primary="Be consistent!!!!" secondary={props.text} />
        </ListItem>
      </List>
    </div>
  );
}

export default Todos;
