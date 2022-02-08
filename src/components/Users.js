import styles from "../css/Users.module.css";
import { getUsers } from "../utils/api";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/User";

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
      <p>...Loading</p>
    ) : (
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
  } else {
    return (
      <>
        <br></br>
        <Link to="/">You need to login to access this page</Link>
      </>
    );
  }
};

export default Users;
