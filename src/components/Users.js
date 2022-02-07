import styles from "../css/Users.module.css";
import { getUsers } from "../utils/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <main>
      <h2 className={styles.Users__header}>Users</h2>
      <ul>
        {users.map((user) => {
          return (
            <Link key={user.username} to={`/users/${user.username}`}>
              <li key={user.username} className={styles.Users__li}>
                <h3>{user.username}</h3>
              </li>
            </Link>
          );
        })}
      </ul>
    </main>
  );
};

export default Users;
