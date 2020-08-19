import React, { useState, useEffect } from "react";
import "./App.css";
import Todos from "./Todos";
import db from "./firebase";
import firebase from "firebase";
import {
  Input,
  Button,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

function App() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    db.collection("items")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setItems(
          snapshot.docs.map((doc) => ({
            todo: doc.data().item,
            id: doc.id,
          }))
        )
      );
  }, []);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    db.collection("items").add({
      item: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };

  return (
    <div className="App">
      <h1>Hello Visitor</h1>
      <p>This is to do list app made with React.js</p>
      <form>
        <FormControl>
          <InputLabel htmlFor="my-input">Enter here</InputLabel>
          <Input
            autoFocus
            fullWidth
            className="App__input"
            value={input}
            onChange={handleChange}
            id="my-input"
            aria-describedby="my-helper-text"
            margin="dense"
          />
          <FormHelperText id="my-helper-text">Todo List Input</FormHelperText>
        </FormControl>
        <Button
          disabled={!input}
          onClick={handleClick}
          className="App__button"
          type="submit"
        >
          <AddCircleIcon />
        </Button>
      </form>

      <div className="App__listitem">
        <ul>
          {items.map((item) => (
            <Todos key={item.id} id={item.id} text={item.todo} />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
