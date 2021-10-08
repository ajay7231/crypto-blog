import React, { useState, useEffect } from "react";
import millify from "millify";
import {motion} from "framer-motion";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Loader from "./Loader";


const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setCryptos(cryptoList?.data?.coins);
    const filteredCryptos = cryptoList?.data?.coins.filter((coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase())
    );
    setCryptos(filteredCryptos);
  }, [cryptoList, search]);

  if (isFetching) return <Loader/>;

  return (
    <>
      {!simplified ? (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrencies.."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      ) : (
        ""
      )}
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((crypto) => (
          <Col xs={24} sm={12} lg={6} key={crypto.id} className="crypto-card">
            <Link to={`/crypto/${crypto.id}`}>
              <motion.div
                whileHover={{
                  scale: 1.1,
                  transition:{duration:0.4}
                }}>
                <Card
                  title={`${crypto.rank}. ${crypto.name}`}
                  extra={
                    <img
                      className="crypto-image"
                      src={crypto.iconUrl}
                      alt="cryto news"
                    />
                  }
                  hoverable
                >
                  <p>Price: {millify(crypto.price)}</p>
                  <p>Market Cap: {millify(crypto.marketCap)}</p>
                  <p>Daily Change: {millify(crypto.change)}%</p>
                </Card>
              </motion.div>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
