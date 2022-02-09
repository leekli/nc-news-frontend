import { Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Alert } from "antd";

const NotLoggedInError = () => {
  return (
    <>
      <br></br>
      <Alert
        message="Error"
        description="Uh oh! You need to login first..."
        type="error"
        showIcon
      />
      <br></br>
      <Link to="/">Click here to go back to the Login page</Link>
    </>
  );
};

export default NotLoggedInError;
