import React from 'react';
import Head from 'next/head';
import axios from 'axios';
import { Row, Col, Icon, Breadcrumb, Divider, Affix } from 'antd';
import 'markdown-navbar/dist/navbar.css';
import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai-sublime.css';
import Header from '../components/Header';
import Author from '../components/Author';
import Advertise from '../components/Advertise';
import Footer from '../components/Footer';
import '../static/style/pages/detail.css';
import Tocify from '../components/tocify.tsx';

const Detail = props => {
  const tocify = new Tocify();
  const renderer = new marked.Renderer();

  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: true,
    smartLists: true,
    highlight: function(code) {
      return hljs.highlightAuto(code).value;
    }
  });

  let html = marked(props.article_content);

  return (
    <div>
      <Head>
        <title>Detail</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={10} lg={15} xl={12}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item href="/">
                  <Icon type="home" /> Home
                </Breadcrumb.Item>

                <Breadcrumb.Item>
                  <Icon type="youtube" /> Video
                </Breadcrumb.Item>

                <Breadcrumb.Item>xxx</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <Divider className="divider" />

            <div>
              <div className="detailed-title">React实战博客</div>
              <div className="list-icon center">
                <span>
                  <Icon type="calender" />
                  2020-1-25
                </span>
                <span>
                  <Icon type="folder" />
                  Video
                </span>
                <span>
                  <Icon type="fire" />
                  6666人
                </span>
              </div>
              <div
                className="detailed-content"
                dangerouslySetInnerHTML={{ __html: html }}
              ></div>
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={14} lg={7} xl={4}>
          <Author />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              {tocify && tocify.render()}
            </div>
          </Affix>
          <Advertise />
        </Col>
      </Row>
      <Divider />
      <Footer />
    </div>
  );
};

Detail.getInitialProps = async context => {
  let id = context.query.id;
  const promise = new Promise(resolve => {
    axios.get('https://127.0.0.1:7001/default/articles/' + id).then(res => {
      resolve(res.data.data[0]);
    });
  });
  return promise;
};

export default Detail;
