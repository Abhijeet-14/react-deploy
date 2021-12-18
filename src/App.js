import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [msg, setMsg] = useState("");

  const getApiData = async () => {
    // const response =await fetch("https://api.zippopotam.us/in/831015");
    const response = await fetch("https://www.boredapi.com/api/activity");
    const data = await response.json();
    setMsg(data?.activity);
    console.log(data);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <span> Random Message (Staging):</span>
        <span>{msg}</span>

        <button
          style={{
            padding: "1rem",
            margin: ".5rem",
            fontSize: "1.5rem",
            backgroundColor: "#B4Bd1D",
          }}
          onClick={() => getApiData()}
        >
          Click me
        </button>

        <p></p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
