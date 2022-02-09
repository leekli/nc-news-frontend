import styles from "../css/UserByUsername.module.css";
import { getUserByUsername, getArticlesByAuthor } from "../utils/api";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/User";
import moment from "moment";
import NotLoggedInError from "./NotLoggedInError";
import "antd/dist/antd.css";
import { List, Card } from "antd";
import { ReadOutlined } from "@ant-design/icons";

const UserByUsername = () => {
  const { isLoggedIn } = useContext(UserContext);

  const { username } = useParams();
  const [user, setUser] = useState({});
  const [articlesByAuthor, setArticlesByAuthor] = useState([]);

  useEffect(() => {
    getUserByUsername(username)
      .then((data) => {
        setUser(data);
      })
      .then(() => {
        getArticlesByAuthor(username).then((data) => {
          setArticlesByAuthor(data);
        });
      });
  }, [username]);

  if (isLoggedIn === true) {
    return (
      <>
        <div>
          <Card
            headStyle={{ backgroundColor: "#F0F2F5" }}
            bodyStyle={{ backgroundColor: "#F0F2F5" }}
          >
            <Card key={user.username} type="inner" title={user.username}>
              <img
                src={user.avatar_url}
                alt={user.username}
                className={styles.UserByUsername__img}
              ></img>
              <br></br>
              <br></br>
              <h3>{user.name}</h3>
            </Card>
            <br></br>
          </Card>
        </div>
        <div className={styles.UserByUsername__div__articles}>
          <h3>Articles written by {user.username}:</h3>

          <List
            itemLayout="vertical"
            size="large"
            dataSource={articlesByAuthor}
            renderItem={(item) => (
              <List.Item key={item.title}>
                <List.Item.Meta
                  avatar={<ReadOutlined />}
                  title={
                    <Link
                      key={item.article_id}
                      to={`/articles/${item.article_id}`}
                    >
                      {item.title}
                    </Link>
                  }
                  description={moment(item.created_at).format("MMMM Do YYYY")}
                />
                <p>💬 Comments: {item.comment_count}</p>
                <p>👍 Likes: {item.votes}</p>
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

export default UserByUsername;
