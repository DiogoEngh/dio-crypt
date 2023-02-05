import React, { useEffect, useState } from "react";
import { listCoins } from "../services/apiService";
import "../styles/Table.css";
import Loading from "./Loading"

const Table = ({setId, darkColors, lightColors, darkMode}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [content, setContent] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    setLoad(false);
    listCoins(currentPage).then((response) => {
      response
        .json()
        .then((info) => {
          setContent(info);
        })
        .finally(() => {
          setLoad(true);
        });
    });
  }, []);

  const nextPage = () => {
    if (currentPage < 1236) {
      setLoad(false);
      listCoins(currentPage + 1).then((response) => {
        response
          .json()
          .then((info) => {
            setContent(info);
          })
          .finally(() => {
            setLoad(true);
          });
      });
      setCurrentPage(currentPage + 1);
    }
  };
  const previousPage = () => {
    if (currentPage > 1) {
      setLoad(false);
      listCoins(currentPage - 1).then((response) => {
        response
          .json()
          .then((info) => {
            setContent(info);
          })
          .finally(() => {
            setLoad(true);
          });
      });
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="Table" style={{
      backgroundColor: darkMode ? darkColors.secondary : lightColors.secondary,
    }}>
      <table>
        <thead>
          <tr
            style={{
              height: "2.5rem",
              color: darkMode ? darkColors.terciary : lightColors.terciary,
            }}
          >
            <th
              style={{
                textAlign: "center",
              }}
            >
              #
            </th>
            <th
              style={{
                textAlign: "start",
                paddingLeft: "1rem",
              }}
            >
              Name
            </th>
            <th
              style={{
                textAlign: "end",
                paddingRight: "1rem",
              }}
            >
              Price
            </th>
            <th
              style={{
                textAlign: "center",
              }}
            >
              24h
            </th>
            <th
              style={{
                textAlign: "end",
                paddingRight: "1rem",
              }}
            >
              High
            </th>
            <th
              style={{
                textAlign: "end",
                paddingRight: "1rem",
              }}
            >
              Low
            </th>
            <th
              style={{
                textAlign: "center",
              }}
            >
              Market Cap
            </th>
          </tr>
        </thead>
        <tbody>
          {!load && <Loading/>}
          {load &&
            content.map((elem, key) => {
              return (
                <tr
                  key={key}
                  style={{
                    height: "2rem",
                    color: darkMode ? darkColors.quartenary : lightColors.quartenary,
                  }}
                  onClick={() => setId(elem.id)}
                >
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {elem.market_cap_rank}
                  </td>
                  <td>
                    <span>
                      <img
                        src={elem.image}
                        style={{
                          height: "1rem",
                          paddingLeft: "1rem",
                        }}
                      />
                    </span>
                    <span
                      style={{
                        color: darkMode ? darkColors.quartenary : lightColors.quartenary,
                        paddingLeft: "1rem",
                      }}
                    >
                      {elem.name}
                    </span>
                    <span
                      style={{
                        paddingLeft: ".5rem",
                        color: "#666",
                        fontSize: "13px",
                      }}
                    >
                      {elem.symbol.toUpperCase()}
                    </span>
                  </td>
                  <td
                    style={{
                      textAlign: "end",
                      paddingRight: "1rem",
                    }}
                  >
                    {elem.current_price
                      .toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        style: "currency",
                        currency: "USD",
                      })
                      .replace("US", "")}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      color:
                        elem.price_change_percentage_24h < 0 ? "#c55" : "#5c5",
                    }}
                  >
                    {elem.price_change_percentage_24h >= 0 ? (
                      <span
                        class="material-symbols-outlined"
                        style={{
                          position: "relative",
                          top: ".2rem"
                        }}
                      >
                        expand_less
                      </span>
                    ) : (
                      <span
                        class="material-symbols-outlined"
                        style={{
                          position: "relative",
                          top: ".2rem"
                        }}
                      >
                        expand_more
                      </span>
                    )}
                    <span style={{
                      position: "relative",
                      top: "-.3rem"
                    }}>
                    {elem.price_change_percentage_24h
                      .toFixed(2)
                      .replace("-", "")}%
                    </span>
                  </td>
                  <td
                    style={{
                      textAlign: "end",
                      paddingRight: "1rem",
                    }}
                  >
                    {elem.high_24h
                      .toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        style: "currency",
                        currency: "USD",
                      })
                      .replace("US", "")}
                  </td>
                  <td
                    style={{
                      textAlign: "end",
                      paddingRight: "1rem",
                    }}
                  >
                    {elem.low_24h
                      .toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        style: "currency",
                        currency: "USD",
                      })
                      .replace("US", "")}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {elem.market_cap
                      .toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        style: "currency",
                        currency: "USD",
                      })
                      .replace("US", "")}
                  </td>
                </tr>
              );
            })}
        </tbody>
        <tfoot>
          <tr
            style={{
              height: "2.5rem",
            }}
          >
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={{
              textAlign: "end"
            }}>
              <span onClick={previousPage} class="material-symbols-outlined np" style={{
                paddingRight: ".2rem",
                paddingTop: ".4rem",
                marginRight: "1rem",
                fontSize: "17px",
                color: darkMode ? darkColors.terciary : lightColors.terciary,
              }}>
                arrow_back_ios
              </span>
              <span onClick={nextPage} class="material-symbols-outlined np" style={{
                paddingRight: ".4rem",
                paddingTop: ".4rem",
                marginRight: "1rem",
                fontSize: "17px",
                color: darkMode ? darkColors.terciary : lightColors.terciary,
              }}>
                arrow_forward_ios
              </span>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Table;
