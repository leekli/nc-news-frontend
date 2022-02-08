import styles from "../css/Topics.module.css";
import { getTopics } from "../utils/api";
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/User";

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
      <p>...Loading</p>
    ) : (
      <main>
        <h2 className={styles.Topics__header}>Topics</h2>
        <ul>
          {topics.map((topic) => {
            return (
              <Link
                key={topic.slug}
                className="Topics__Link"
                to={`/articles?topic=${topic.slug}`}
              >
                <li key={topic.slug} className={styles.Topics__li}>
                  <h3>{topic.slug}</h3>
                  <p>Description: {topic.description}</p>
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

export default Topics;
