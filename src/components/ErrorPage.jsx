import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { Alert } from "antd";

const ErrorPage = () => {
  const { isLoggedIn } = useContext(UserContext);
  const LoggedInCheck = JSON.parse(localStorage.getItem("isLoggedIn"));

  if (isLoggedIn === true || LoggedInCheck === true) {
    return (
      <>
        <br></br>
        <Alert
          message="Error"
          description="Uh oh! That page was not found!"
          type="error"
          showIcon
        />
        <br></br>
        <Link to="/articles">Click here to go back to the Articles page</Link>
      </>
    );
  } else {
    return (
      <>
        <br></br>
        <Alert
          message="Error"
          description="Uh oh! That page was not found!"
          type="error"
          showIcon
        />
        <br></br>
        <Link to="/">Click here to go back to the Login page</Link>
      </>
    );
  }
};

export default ErrorPage;
