import React from "react";
import "../styles/Header.css";
import Search from "./Search";

const Header = ({ setId, setDarkMode, darkColors, lightColors, darkMode }) => {
  return (
    <header
      className="Header"
      style={{
        backgroundColor: darkMode
          ? darkColors.secondary
          : lightColors.secondary,
      }}
    >
      <Search
        setId={setId}
        darkColors={darkColors}
        lightColors={lightColors}
        darkMode={darkMode}
      />
    </header>
  );
};

export default Header;
