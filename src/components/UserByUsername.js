import styles from "../css/UserByUsername.module.css";
import { getUserByUsername } from "../utils/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const UserByUsername = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserByUsername(username).then((data) => {
      setUser(data);
    });
  }, [username]);

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
    </>
  );
};

export default UserByUsername;
