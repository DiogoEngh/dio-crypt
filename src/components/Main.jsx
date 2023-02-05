import React from "react";
import HeaderCoin from "./HeaderCoin";
import "../styles/Main.css";
import Table from "./Table";

const Main = ({id, setId, darkColors, lightColors, darkMode}) => {

  return (
    <main className="Main">
      <HeaderCoin id={id} darkColors={darkColors} lightColors={lightColors} darkMode={darkMode}/>
      <Table setId={setId} darkColors={darkColors} lightColors={lightColors} darkMode={darkMode}/>
    </main>
  );
};

export default Main;
