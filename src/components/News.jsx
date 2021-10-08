import React,{useState} from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import moment from "moment";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { motion } from "framer-motion";
import Loader from "./Loader";
const { Text, Title } = Typography;
const { Option } = Select;
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'

const News = ({ simplified }) => {
  const count = simplified ? 6 : 18;
  const [newsCategory, setnewsCategory] = useState('Cryptocurrency')
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    newsCategory,
    count,
  });
   const { data } = useGetCryptosQuery(100);

  if (!cryptoNews?.value || isFetching) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            className="select-news"
            placeholder="Select a news category"
            optionFilterProp="children"
            onChange={(value) => setnewsCategory(value)}
            filterOption={(input, option) =>option.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="Cryptocurrency">
              Cryptocurrency
            </Option> 
            {data?.data?.coins.map((coin) => <Option value={coin.name}></Option>)}
            
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <motion.div
                whileHover={{
                  scale: 1.1,
                  transition:{duration:0.4}
                }}>
          <Card hoverable>
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={5}>
                  {news.name}
                </Title>
                <img style={{maxWidth:'200px',maxHeight:'100px'}} src={news?.image?.thumbnail?.contentUrl || demoImage} alt="news" />
                
              </div>
              <p style={{ color: "black" }}>{ news.description > 100 ? news.description.substring(0,100)+'...': news.description}</p>
              <div className="provider-container">
                <div>
                  <Avatar src={ news.provider[0]?.image?.thumbnail?.contentUrl || demoImage }/>
                  <Text className="provider-name">
                    {news.provider[0]?.name}
                  </Text>
                </div>
                  <Text>{moment(news.datePublished).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
          </motion.div>
        </Col>
      ))}
    </Row>
  );
};

export default News;
