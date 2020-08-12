import React, { useState, useEffect } from "react";
import "./App.css";
import List from "./List";
import db from "./firebase";
import firebase from "firebase";

function App() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    db.collection("items")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setItems(snapshot.docs.map((doc) => doc.data().item));
      });
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
    console.log(items);
    setInput("");
  };

  return (
    <div className="App">
      <form>
        <input onChange={handleChange} value={input} />
        <button onClick={handleClick}>Add</button>
      </form>
      <ul>
        {items.map((item) => (
          <List text={item} />
        ))}
      </ul>
    </div>
  );
}

export default App;
