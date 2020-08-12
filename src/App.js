import React, { useState } from "react";
import "./App.css";
import List from "./List";

function App() {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setItems([...items, input]);
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
