import React, { useState } from "react";
import Main from "./components/Main";
import Header from "./components/Header";
import "./styles/App.css";

const App = () => {
  const [id, setId] = useState("bitcoin");
  const [darkMode, setDarkMode] = useState(false);

  const lightColors = {
    primary: "#f5f5fa",
    secondary: "#fafafa",
    terciary: "#444",
    quartenary: "#666",
  };

  const darkColors = {
    primary: "#222",
    secondary: "#333",
    terciary: "#aaf",
    quartenary: "#ccf"
  }

  return (
    <div
      className="App"
      style={{
        backgroundColor: darkMode ? darkColors.primary : lightColors.primary,
      }}
    >
      <Header setId={setId} setDarkMode={setDarkMode} darkColors={darkColors} lightColors={lightColors} darkMode={darkMode}/>
      <Main id={id} setId={setId} darkColors={darkColors} lightColors={lightColors} darkMode={darkMode}/>
    </div>
  );
};

export default App;
