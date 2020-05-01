import React from 'react';
import '../static/style/components/header.css';
import { Row, Col, Menu, Icon } from 'antd';

const Header = () => (
  <div className="header">
    <Row type="flex" justify="center">
      <Col xs={24} sm={24} md={10} lg={15} xl={12}>
        <ul className="header-ul">
          <li className="header-logo">Chenxii</li>
          <li className="header-txt">Front End && Full Stack</li>
        </ul>
      </Col>
      <Col xs={0} sm={0} md={14} lg={8} xl={5}>
        <Menu mode="horizontal">
          <Menu.Item key="home">
            <Icon type="home" />
            Home
          </Menu.Item>
          <Menu.Item key="video">
            <Icon type="youtube" />
            Video
          </Menu.Item>
          <Menu.Item key="life">
            <Icon type="smile" />
            Life
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  </div>
);

export default Header;
