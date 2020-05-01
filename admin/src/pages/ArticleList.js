import React, { useState, useEffect, Fragment } from 'react';
import { List, Row, Col, Modal, Button, message } from 'antd';
import axios from 'axios';
import servicePath from '../config/apiUrl';
import '../static/css/articleList.css';

const { confirm } = Modal;

const ArticleList = props => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    axios({
      method: 'get',
      url: servicePath.getArticleList,
      withCredentials: true
    }).then(res => {
      setList(res.data.list);
    });
  };

  // 删除文章的方法
  const delArticle = id => {
    confirm({
      title: '确定要删除这篇博客文章吗?',
      content: '点击OK，将删除文章',
      onOk() {
        axios(servicePath.deleteArticle + id, { withCredentials: true }).then(
          res => {
            message.success('文章删除成功');
            getList();
          }
        );
      },
      onCancel() {
        message.success('文章没有任何变化');
      }
    });
  };

  // 修改文章跳转方法
  // 思路是这边就某篇文章点击修改，然后跳转到add页面，并把文章id传过去
  // 在add页面再根据传过去的文章id进行请求
  const updateArticle = (id, checked) => {
    props.history.push('/index/add/' + id);
  };

  return (
    <div>
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={3}>
              <b>类别</b>
            </Col>
            <Col span={3}>
              <b>发布时间</b>
            </Col>
            <Col span={3}>
              <b>集数</b>
            </Col>
            <Col span={3}>
              <b>浏览量</b>
            </Col>

            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>
        }
        bordered
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Row className="list-div">
              <Col span={8}>{item.title}</Col>
              <Col span={3}>{item.typeName}</Col>
              <Col span={3}>{item.addTime}</Col>
              <Col span={3}>
                共<span>{item.part_count}</span>集
              </Col>
              <Col span={3}>{item.view_count}</Col>

              <Col span={4}>
                <Button type="primary" onClick={() => updateArticle(item.id)}>
                  修改
                </Button>
                &nbsp;
                <Button onClick={() => delArticle(item.id)}>删除 </Button>
              </Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
};

export default ArticleList;
