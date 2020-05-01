import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Row, Col, List, Icon, Divider } from 'antd';
import axios from 'axios';
import Header from '../components/Header';
import Author from '../components/Author';
import Advertise from '../components/Advertise';
import Footer from '../components/Footer';
import '../static/style/pages/index.css';

const Home = res => {
  const [list, setList] = useState(res.data);

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={10} lg={14} xl={12}>
          <List
            header={<div className="title">最新日志</div>}
            dataSource={list}
            itemLayout="vertical"
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{ pathname: '/detail', query: { id: item.id } }}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                  <span>
                    <Icon type="calendar" /> {item.addTime}
                  </span>
                  <span>
                    <Icon type="folder" /> {item.typeName}
                  </span>
                  <span>
                    <Icon type="fire" /> {item.view_count} 人
                  </span>
                </div>
                <div className="list-context">{item.introduction}</div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={14} lg={8} xl={4}>
          <Author />
          <Advertise />
        </Col>
      </Row>
      <Divider />
      <Footer />
    </div>
  );
};

Home.getInitialProps = async () => {
  const promise = new Promise(resolve => {
    axios
      .get('https://127.0.0.1:7001/default/articles')
      .then(res => {
        console.log(res.data);
        resolve(res.data);
      })
      .catch(err => console.log(err));
  });

  return await promise;
};

export default Home;
