import { useEffect, useState } from "react";
import styles from "../css/Articles.module.css";
import { getAllArticles } from "../utils/api";
import { Link } from "react-router-dom";

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    getAllArticles().then((articlesFromApi) => {
      setArticles(articlesFromApi);
    });
  }, []);

  return (
    <main className={styles.Articles__main}>
      <h2 className={styles.Articles__header}>All articles</h2>
      <ul>
        {articles.map((article) => {
          return (
            <Link
              key={article.article_id}
              to={`/articles/${article.article_id}`}
            >
              <li key={article.article_id} className={styles.Articles__li}>
                <h3>{article.title}</h3>
                <p>Author: {article.author}</p>
                <p>Published: {article.created_at}</p>
                <p>Votes: {article.votes}</p>
                <p>Comments: {article.comment_count}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </main>
  );
};

export default Articles;
