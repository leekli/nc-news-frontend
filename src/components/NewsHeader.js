import "antd/dist/antd.css";
import { PageHeader } from "antd";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/User";

const NewsHeader = () => {
  const navigate = useNavigate();
  const { loggedInUser, isLoggedIn } = useContext(UserContext);

  if (isLoggedIn === true) {
    return (
      <>
        <PageHeader
          className="site-page-header"
          onBack={() => navigate(-1)}
          title="📰 NC-News"
          subTitle={`Hello, ${loggedInUser.username}!`}
        />
      </>
    );
  } else {
    return (
      <>
        <PageHeader
          className="site-page-header"
          onBack={() => navigate(-1)}
          title="📰 NC-News"
          subTitle={`Please log in`}
        />
      </>
    );
  }
};

export default NewsHeader;
