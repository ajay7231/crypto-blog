import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Link } from "react-router-dom";
import { Cryptocurrencies, News } from "../components";
import { motion } from "framer-motion";
import Loader from "./Loader";
const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  const globalStats = data?.data?.stats;

  if (isFetching) return <Loader />;
  return (
    <>
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>
      <Row>
        <Col span={12}>
          <motion.div
            style={{cursor: 'pointer'}}
            whileHover={{ scale: 1.1, x: 25, transition: { duration: 0.4 } }}
            
          >
            <Statistic
              title="Total Cryptocurrencies"
              value={globalStats.total}
            />
          </motion.div>
        </Col>
        <Col span={12}>
          <motion.div
            style={{cursor: 'pointer'}}
            whileHover={{ scale: 1.1, x: 25, transition: { duration: 0.4 } }}
           
          >
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          /></motion.div>
        </Col>
        <Col span={12}>
          <motion.div
            style={{cursor: 'pointer'}}
            whileHover={{ scale: 1.1, x: 25, transition: { duration: 0.4 } }}
            
          >
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          /></motion.div>
        </Col>
        <Col span={12}>
          <motion.div
            style={{cursor: 'pointer'}}
            whileHover={{ scale: 1.1, x: 25, transition: { duration: 0.4 } }}
           
          >
          <Statistic
            title="Total 24h Volume"
            value={millify(globalStats.total24hVolume)}
          /></motion.div>
        </Col>
        <Col span={12}>
          <motion.div
            style={{cursor: 'pointer'}}
            whileHover={{ scale: 1.1, x: 25, transition: { duration: 0.4 } }}
            
          >
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          /></motion.div>
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title className="home-title" level={2}>
          Top 10 Cryptocurrencies
        </Title>
        <Title className="show-more" level={3}>
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title className="home-title" level={2}>
          Latest Crypto News
        </Title>
        <Title className="show-more" level={3}>
          <Link to="/news">Show More</Link>
        </Title>
      </div>
      <News simplified />
    </>
  );
};

export default Homepage;
