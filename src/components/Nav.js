import React from "react";
import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Menu } from "antd";

const Nav = () => {
  return (
    <>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
        <Menu.Item key="articles">
          <Link className="Nav__Link" to="/articles">
            Articles
          </Link>
        </Menu.Item>
        <Menu.Item key="topics">
          <Link className="Nav__Link" to="/topics">
            Topics
          </Link>
        </Menu.Item>
        <Menu.Item key="users">
          <Link className="Nav__Link" to="/users">
            Users
          </Link>
        </Menu.Item>
        <Menu.Item key="errorpage">
          <Link className="Nav__Link" to="/TESTERRORPAGE">
            Error Test
          </Link>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default Nav;
