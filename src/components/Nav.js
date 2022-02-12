import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/User";
import "antd/dist/antd.css";
import { Menu } from "antd";

const Nav = () => {
  const { setLoggedInUser, isLoggedIn } = useContext(UserContext);
  const LoggedInCheck = JSON.parse(localStorage.getItem("isLoggedIn"));

  let navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");
    setLoggedInUser({ username: undefined });
    alert("You are now logged out.");
    routeChange("/");
  };

  if (isLoggedIn === true || LoggedInCheck === true) {
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
          <Menu.Item key="logoutButton" onClick={() => handleLogout()}>
            Logout
          </Menu.Item>
        </Menu>
      </>
    );
  } else {
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
        </Menu>
      </>
    );
  }
};

export default Nav;
