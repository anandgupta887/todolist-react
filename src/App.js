import React, { useState, useEffect } from "react";
import "./App.css";
import Todos from "./Todos";
import db from "./firebase";
import firebase from "firebase";
import { Input, Button } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";

function App() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    db.collection("items")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setItems(snapshot.docs.map((doc) => doc.data().item))
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
      <form>
        <Input onChange={handleChange} className="App__input" value={input} />
        <Button disabled={!input} onClick={handleClick} className="App__button">
          <AddCircleIcon />
        </Button>
      </form>
      <ul>
        {items.map((item) => (
          <Todos text={item} />
        ))}
      </ul>
    </div>
  );
}

export default App;
