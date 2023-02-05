import React, { useEffect, useState } from "react";
import { selectedCoin } from "../services/apiService";
import "../styles/HeaderCoin.css";
import "../styles/Table.css";
import Loading from "./Loading";

const HeaderCoin = ({ id, darkColors, lightColors, darkMode }) => {
  const [content, setContent] = useState({});
  const [load, setLoad] = useState(true);

  const correctHours = (h) => {
    if (h < 10) {
      return "0" + h.toString();
    } else {
      return h;
    }
  };

  useEffect(() => {
    setLoad(false);
    selectedCoin(id)
      .then((response) => {
        response.json().then((info) => {
          setContent({
            image: info.image.large,
            price: info.market_data.current_price.usd
              .toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                style: "currency",
                currency: "USD",
              })
              .replace("US", ""),
            name: info.name,
            percent:
              info.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
                2
              ),
            low: info.market_data.low_24h.usd
              .toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                style: "currency",
                currency: "USD",
              })
              .replace("US", ""),
            high: info.market_data.high_24h.usd
              .toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                style: "currency",
                currency: "USD",
              })
              .replace("US", ""),
            lastUpdate:
              correctHours(new Date(Date.parse(info.last_updated)).getHours()) +
              ":" +
              correctHours(
                new Date(Date.parse(info.last_updated)).getMinutes()
              ) +
              ":" +
              correctHours(
                new Date(Date.parse(info.last_updated)).getSeconds()
              ),
          });
        });
      })
      .finally(() => {
        setLoad(true);
      });
  }, [id]);

  return (
    <div className="HeaderCoin">
      <div
        className="Symbol"
        style={{
          backgroundColor: darkMode
            ? darkColors.secondary
            : lightColors.secondary,
        }}
      >
        {!load && <Loading />}
        {load && (
          <img
            style={{
              height: "5rem",
            }}
            src={content.image}
          />
        )}
      </div>
      <div
        style={{
          width: "12rem",
          position: "absolute",
          height: "10rem",
          left: "11.5rem",
        }}
      >
        <div
          className="Name"
          style={{
            backgroundColor: darkMode
              ? darkColors.secondary
              : lightColors.secondary,
            color: darkMode ? darkColors.terciary : lightColors.terciary,
          }}
        >
          <label
            style={{
              color: darkMode ? darkColors.quartenary : lightColors.quartenary,
            }}
          >
            Name
          </label>
          {load && content.name}
        </div>
        <div
          className="Price"
          style={{
            backgroundColor: darkMode
              ? darkColors.secondary
              : lightColors.secondary,
            color: darkMode ? darkColors.terciary : lightColors.terciary,
          }}
        >
          <label
            style={{
              color: darkMode ? darkColors.quartenary : lightColors.quartenary,
            }}
          >
            Price
          </label>
          {load && content.price}
        </div>
        <div
          className="Percent"
          style={{
            color: content.percent >= 0 ? "#5c5" : "#c55",
            backgroundColor: darkMode
              ? darkColors.secondary
              : lightColors.secondary,
          }}
        >
          <label
            style={{
              color: darkMode ? darkColors.quartenary : lightColors.quartenary,
            }}
          >
            Variation
          </label>
          {content.percent >= 0 ? (
            <span class="material-symbols-outlined">expand_less</span>
          ) : (
            <span class="material-symbols-outlined">expand_more</span>
          )}
          {load && Math.abs(content.percent).toFixed(2)}%
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          height: "10rem",
          width: "12rem",
          left: "25rem",
        }}
      >
        <div
          className="Name"
          style={{
            color: "#5c5",
            backgroundColor: darkMode
              ? darkColors.secondary
              : lightColors.secondary,
          }}
        >
          <label
            style={{
              color: darkMode ? darkColors.quartenary : lightColors.quartenary,
            }}
          >
            High
          </label>
          <span class="material-symbols-outlined">expand_less</span>
          {load && content.high}
        </div>
        <div
          className="Price"
          style={{
            color: "#c55",
            backgroundColor: darkMode
              ? darkColors.secondary
              : lightColors.secondary,
          }}
        >
          <label
            style={{
              color: darkMode ? darkColors.quartenary : lightColors.quartenary,
            }}
          >
            Low
          </label>
          <span class="material-symbols-outlined">expand_more</span>
          {load && content.low}
        </div>
        <div
          className="Percent"
          style={{
            backgroundColor: darkMode
              ? darkColors.secondary
              : lightColors.secondary,
            color: darkMode ? darkColors.terciary : lightColors.terciary,
          }}
        >
          <label
            style={{
              color: darkMode ? darkColors.quartenary : lightColors.quartenary,
            }}
          >
            Last change
          </label>
          {load && content.lastUpdate}
        </div>
      </div>
    </div>
  );
};

export default HeaderCoin;
