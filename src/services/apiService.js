const url = "https://api.coingecko.com/api/v3"

export const listCoins = (page) => {
    return fetch(`${url}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${page}&sparkline=false`)
}

export const searchCoin = (txt) => {
    return fetch(`${url}/search?query=${txt}`)
}

export const selectedCoin = (id) => {
    return fetch(`${url}/coins/${id}?tickers=true&market_data=true&community_data=true&developer_data=true&sparkline=true`)
}

export const tickerCoins = (id) => {
    return fetch(`${url}/coins/${id}/tickers`)
}