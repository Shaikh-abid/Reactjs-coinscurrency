import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

// const API_KEY = "CG-pge2vQgQuRhnwuRZSV4bN1Ni";

const CoinContextProvider = (props) => {
  const [allcoins, setAllCoins] = useState([]);
  const [currency, setCurrency] = useState({
    name: "USD",
    symbol: "$",
  });

  const fetchAllCoins = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "	CG-pge2vQgQuRhnwuRZSV4bN1Ni",
      },
    };

     fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
      options
    )
      .then((response) => response.json())
      .then((response) => setAllCoins(response))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAllCoins();
  }, [currency]);

  const contextValue = {allcoins , currency, setCurrency};

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
