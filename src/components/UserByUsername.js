import styles from "../css/UserByUsername.module.css";
import { getUserByUsername, getArticlesByAuthor } from "../utils/api";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/User";
import moment from "moment";
import NotLoggedInError from "./NotLoggedInError";

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
        <div className={styles.UserByUsername__div__user}>
          <h2>{user.username}</h2>
          <img
            src={user.avatar_url}
            alt={user.username}
            className={styles.UserByUsername__img}
          ></img>
          <p>{user.name}</p>
        </div>
        <div className={styles.UserByUsername__div__articles}>
          <br></br>
          <h3>Articles written by {user.username}:</h3>
          <ul>
            {articlesByAuthor.map((article) => {
              return (
                <Link
                  key={article.article_id}
                  to={`/articles/${article.article_id}`}
                >
                  <li
                    key={article.article_id}
                    className={styles.UserByUsername__comments__li}
                  >
                    <h4>{article.title}</h4>
                    <p>
                      Published:{" "}
                      {moment(article.created_at).format("MMMM Do YYYY")}
                    </p>
                    <p>💬 Comments: {article.comment_count}</p>
                    <p>👍 Likes: {article.votes}</p>
                  </li>
                </Link>
              );
            })}
          </ul>
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
