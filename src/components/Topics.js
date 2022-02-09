import { getTopics } from "../utils/api";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/User";
import LoadingSpin from "./LoadingSpin";
import "antd/dist/antd.css";
import { Card } from "antd";
import NotLoggedInError from "./NotLoggedInError";

const Topics = () => {
  const { isLoggedIn } = useContext(UserContext);

  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTopics().then((data) => {
      setTopics(data);
      setIsLoading(false);
    });
  }, []);

  if (isLoggedIn === true) {
    return isLoading ? (
      <LoadingSpin />
    ) : (
      <>
        <div>
          <Card
            title="Topic List"
            headStyle={{ backgroundColor: "#F0F2F5" }}
            bodyStyle={{ backgroundColor: "#F0F2F5" }}
          >
            {topics.map((topic) => {
              return (
                <>
                  <Card
                    key={topic.slug}
                    type="inner"
                    title={topic.slug}
                    extra={
                      <Link
                        key={topic.slug}
                        to={`/articles?topic=${topic.slug}`}
                      >
                        See articles
                      </Link>
                    }
                  >
                    {topic.description}
                  </Card>
                  <br></br>
                </>
              );
            })}
          </Card>
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

export default Topics;
