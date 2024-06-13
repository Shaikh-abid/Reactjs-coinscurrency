import React, { useContext, useEffect, useState } from "react";
import "./Home.css";

import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";


const Home = () => {
  const { allcoins, currency } = useContext(CoinContext);
  const [displayCoins, setDisplayCoins] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (event) => {
    setInput(event.target.value);

    if(event.target.value === "") {
      setDisplayCoins(allcoins);
    }
  }

  const seacrhHandler = async (event) => {
    event.preventDefault();
    const coins = await allcoins.filter((coin) => {
      return coin.name.toLowerCase().includes(input.toLowerCase());
    })

    setDisplayCoins(coins);
  }

  useEffect(() => {
    setDisplayCoins(allcoins);
  }, [allcoins]);


  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto Marketplace
        </h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace. Sign up to
          explore more about cryptos.
        </p>

        <form onSubmit={seacrhHandler}>

          <input type="text" value={input} placeholder="Search crypto....." required onChange={inputHandler} list="coinlist"/>

          <datalist id="coinlist">
            {allcoins.map((item, index) => (
              <option key={index} value={item.name} />
            ))}
          </datalist>


          <button type="submit">Search</button>
        </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="marketcap">Market Cap</p>
        </div>

        {displayCoins.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{item.name + " - " + item.symbol}</p>
            </div>
            <p>{currency.symbol} {item.current_price.toLocaleString()}</p>

            <p className={item.price_change_percentage_24h > 0 ? "green": "red"}>
              {Math.floor(item.price_change_percentage_24h*100)/100}
            </p>


            <p className="marketcap">{currency.symbol} {item.market_cap.toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
