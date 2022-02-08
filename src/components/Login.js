import styles from "../css/Login.module.css";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/User";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [newUsername, setNewUsername] = useState("");
  const { setLoggedInUser } = useContext(UserContext);

  let navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path);
  };

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoggedInUser({ username: newUsername });
    setNewUsername("");
    routeChange(`/articles`);
  };

  return (
    <main>
      <h2 className={styles.Login__header}>Login</h2>
      <form className="Login__form" onSubmit={handleSubmit}>
        <label htmlFor="Login__textbox">
          <p>Enter your username:</p>
          <p>
            * For demo purposes: Login using <b>jessjelly</b>
          </p>
          <input
            type="text"
            name="Login__textbox"
            id="Login__textbox"
            value={newUsername}
            onChange={handleUsernameChange}
            placeholder="Enter a username here..."
            required
          ></input>
        </label>
        <br></br>
        <button>Log in</button>
      </form>
    </main>
  );
};

export default Login;
