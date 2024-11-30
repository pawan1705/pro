import React from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";
import { Helmet } from "react-helmet";
import "./Content.css";
const Content = () => {
  return (
    <div className="content">
      <Helmet>
        <meta charSet="utf-8" />
        <title>SearchAI -ChatBot</title>
      </Helmet>
      <Sidebar />
      <Main />
    </div>
  );
};

export default Content;
