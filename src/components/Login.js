import styles from "../css/Login.module.css";

const Login = () => {
  return (
    <main>
      <h2 className={styles.Login__header}>Login</h2>
      <p>Put text box here for username</p>
      <button>Log in</button>
    </main>
  );
};

export default Login;
