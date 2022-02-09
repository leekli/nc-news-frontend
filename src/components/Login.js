import { useEffect, useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { useNavigate } from "react-router-dom";
import { getUsers } from "../utils/api";
import "antd/dist/antd.css";
import { Alert, Button, Input, Tooltip } from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";

const Login = () => {
  const [newUsername, setNewUsername] = useState("");
  const [userList, setUserList] = useState([]);
  const { setLoggedInUser } = useContext(UserContext);

  useEffect(() => {
    getUsers().then((data) => {
      setUserList(data);
    });
  }, []);

  let navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path);
  };

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    userList.forEach((eachUser) => {
      if (eachUser.username === newUsername) {
        setLoggedInUser({ username: newUsername });
        setNewUsername("");
        routeChange(`/articles`);
      }
    });
  };

  return (
    <main>
      <br></br>
      <form className="Login__form" onSubmit={handleSubmit}>
        <label htmlFor="Login__textbox">
          <Alert
            message="Login"
            description={`For Demo purposes - Please log in as: jessjelly`}
            type="info"
            showIcon
          />
          <br></br>
          <Input
            name="Login__textbox"
            id="Login__textbox"
            value={newUsername}
            onChange={handleUsernameChange}
            placeholder="Enter your username"
            required
            prefix={<UserOutlined className="site-form-item-icon" />}
            suffix={
              <Tooltip title="Please enter your username">
                <InfoCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
              </Tooltip>
            }
          />
        </label>
        <br></br>
        <Button type="primary" htmlType="submit" style={{ marginTop: "4px" }}>
          Log in
        </Button>
      </form>
    </main>
  );
};

export default Login;
