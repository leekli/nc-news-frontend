import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <p style={{ textAlign: "center" }}>Page not found</p>
      <Link to="/">Go to Home </Link>
    </>
  );
};

export default ErrorPage;
