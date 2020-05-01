import React from 'react';
import { Avatar, Divider } from 'antd';
import '../static/style/components/author.css';

const Author = () => {
  return (
    <div className="author-div comm-box">
      <div>
        <Avatar
          size={100}
          src="http://img4.imgtn.bdimg.com/it/u=3743838320,3620760012&fm=26&gp=0.jpg"
        />
      </div>
      <div className="author-intro">
        Front End && Full Stack Engineer, love React, React Native, Vue, Django,
        Express.
        <Divider>Social Accounts</Divider>
        <Avatar size={30} icon="github" className="account" />
        <Avatar size={30} icon="linkedin" className="account" />
        <Avatar size={30} icon="weibo" className="account" />
      </div>
    </div>
  );
};

export default Author;
