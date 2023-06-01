import styles from "../css/Users.module.css";
import { getUsers } from "../utils/api";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/User";
import LoadingSpin from "./LoadingSpin";
import NotLoggedInError from "./NotLoggedInError";
import "antd/dist/antd.css";
import { List, Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { isLoggedIn } = useContext(UserContext);
  const LoggedInCheck = JSON.parse(localStorage.getItem("isLoggedIn"));

  let navigate = useNavigate();

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
      setIsLoading(false);
    });
  }, []);

  const routeChange = (path) => {
    navigate(path);
  };

  if (isLoggedIn === true || LoggedInCheck === true) {
    return isLoading ? (
      <LoadingSpin />
    ) : (
      <>
        <br></br>
        <Button
          danger
          onClick={() => {
            routeChange(`/signup`);
          }}
        >
          Create a New User
        </Button>
        <br></br>
        <br></br>
        <div className={styles.Users__div}>
          <h3>All users:</h3>
          <List
            itemLayout="horizontal"
            dataSource={users}
            renderItem={(user) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      style={{
                        backgroundColor: "#031527",
                      }}
                      icon={<UserOutlined />}
                    />
                  }
                  title={user.username}
                  description={
                    <Link key={user.username} to={`/users/${user.username}`}>
                      Click for more info on {user.username}
                    </Link>
                  }
                />
              </List.Item>
            )}
          />
        </div>
      </>
    );
  } else {
    return (
      <>
        <NotLoggedInError />
      </>
    );
  }
};

export default Users;
