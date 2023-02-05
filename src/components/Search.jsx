import React, { useEffect, useState } from "react";
import { searchCoin } from "../services/apiService";
import "../styles/Search.css";

const Search = ({setId, darkColors, lightColors, darkMode}) => {
  const [textCurrent, setTextCurrent] = useState("");
  const [contentSearch, setContentSearch] = useState([]);

  useEffect(() => {
    if (textCurrent.length >= 3) {
      searchCoin(textCurrent).then((response) => {
        response.json().then((info) => {
          if (info.coins.length >= 4) {
            setContentSearch([
              info.coins[0],
              info.coins[1],
              info.coins[2],
              info.coins[3],
            ]);
          } else if (info.coins.length === 3) {
            setContentSearch([info.coins[0], info.coins[1], info.coins[2]]);
          } else if (info.coins.length === 2) {
            setContentSearch([info.coins[0], info.coins[1]]);
          } else if (info.coins.length === 1) {
            setContentSearch([info.coins[0]]);
          }else{
            setContentSearch([])
          }
        });
      });
    }else{
        setContentSearch([])
    }
  }, [textCurrent]);

  const handleChangeText = (e) => {
    setTextCurrent(e.target.value);
  };

  const handleSelectOption = (option) => {
    setTextCurrent("")
    setContentSearch([])
    setId(option)
    document.getElementsByClassName("SearchBar")[0].value = ""
  }

  return (
    <div className="SearchDiv">
      <span
        class="material-symbols-outlined"
        style={{
          color: "#666",
          position: "absolute",
          right: "14rem",
          cursor: "pointer",
          zIndex: "-1",
        }}
      >
        search
      </span>
      <input
        type="text"
        placeholder="Search"
        className="SearchBar"
        onChange={handleChangeText}
      />
      <div
        className="listCoins"
        style={{
          border:
            contentSearch.length > 0 ? "1px solid rgba(0, 0, 0, .2)" : "none",
            backgroundColor: darkMode ? darkColors.secondary : lightColors.secondary,
        }}
      >
        {contentSearch.length > 0 &&
          contentSearch.map((elem, key) => {
            return (
              <div
                style={{
                  height: "2rem",
                  width: "100%",
                  paddingLeft: "1rem",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  gap: ".5rem",
                }}
                className="option"
                key={key}
                onClick={() => handleSelectOption(elem.id)}
              >
                <img
                  src={elem.thumb}
                  style={{
                    height: "1rem",
                  }}
                />
                <span
                  style={{
                    color: darkMode ? darkColors.terciary : lightColors.terciary,
                  }}
                >
                  {elem.name}
                </span>
                <span
                  style={{
                    fontSize: "13px",
                    color: "#666",
                  }}
                >
                  {elem.symbol}
                </span>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Search;
