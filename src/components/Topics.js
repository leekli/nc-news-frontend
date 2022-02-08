import styles from "../css/Topics.module.css";
import { getTopics } from "../utils/api";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Topics = () => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics().then((data) => {
      setTopics(data);
    });
  }, []);

  return (
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
};

export default Topics;
