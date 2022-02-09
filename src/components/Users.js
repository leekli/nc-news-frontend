import { getUsers } from "../utils/api";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/User";
import LoadingSpin from "./LoadingSpin";
import NotLoggedInError from "./NotLoggedInError";
import "antd/dist/antd.css";
import { List, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const Users = () => {
  const { isLoggedIn } = useContext(UserContext);

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoggedIn === true) {
    return isLoading ? (
      <LoadingSpin />
    ) : (
      <>
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
