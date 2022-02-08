import { useEffect, useState, useContext } from "react";
import styles from "../css/Articles.module.css";
import { getAllArticles } from "../utils/api";
import { Link, useSearchParams } from "react-router-dom";
import moment from "moment";
import { UserContext } from "../contexts/User";

const Articles = () => {
  const { isLoggedIn } = useContext(UserContext);

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [orderBy, setOrderBy] = useState("");
  const [sortBy, setSortBy] = useState("");

  const topic = searchParams.get("topic");

  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    getAllArticles(topic, sortBy, orderBy).then((articlesFromApi) => {
      setArticles(articlesFromApi);
      setIsLoading(false);
    });
  }, [topic, sortBy, orderBy]);

  if (isLoggedIn === true) {
    return isLoading ? (
      <p>...Loading</p>
    ) : (
      <main className={styles.Articles__main}>
        <h2 className={styles.Articles__header}>All articles</h2>
        <p>
          Sort by:
          <select
            className="orderList"
            name="sortList"
            id="sortList"
            value={sortBy}
            onChange={handleSortByChange}
          >
            <option value="" disabled defaultValue>
              Select sort by
            </option>
            <option>created_at</option>
            <option>comment_count</option>
            <option>votes</option>
          </select>{" "}
          Order by:
          <select
            className="orderList"
            name="orderList"
            id="orderList"
            value={orderBy}
            onChange={handleOrderByChange}
          >
            <option value="" disabled defaultValue>
              Select order by
            </option>
            <option>asc</option>
            <option>desc</option>
          </select>
        </p>
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
                  <p>
                    Published:{" "}
                    {moment(article.created_at).format("MMMM Do YYYY")}
                  </p>
                  <p>👍 Likes: {article.votes}</p>
                  <p>💬 Comments: {article.comment_count}</p>
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

export default Articles;
