import styles from "../css/Topics.module.css";
import { getTopics } from "../utils/api";
import { useEffect, useState } from "react";

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
            <li key={topic.slug} className={styles.Topics__li}>
              <h3>{topic.slug}</h3>
              <p>Description: {topic.description}</p>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default Topics;
