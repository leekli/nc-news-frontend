import styles from "../css/ArticleById.module.css";
import { getArticleById, getCommentsByArticleId } from "../utils/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ArticleById = () => {
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getArticleById(article_id)
      .then((data) => {
        setArticle(data);
      })
      .then(() => {
        getCommentsByArticleId(article_id).then((data) => {
          setComments(data);
        });
      });
  }, [article_id]);

  return (
    <>
      <div className={styles.ArticlesById__div__article}>
        <h2>{article.title}</h2>
        <p>Author: {article.author}</p>
        <p>Published: {article.created_at}</p>
        <p>Comments: {article.comment_count}</p>
        <p>Topic: {article.topic}</p>
        <article>{article.body}</article>
        <button>Delete</button>
        <button>Like</button>
      </div>
      <hr></hr>
      <div className={styles.ArticleById__div__comments}>
        <form action="/action_page.php">
          <label for="commentBox">Add a comment:</label>
          <input type="text" id="commentBox" name="commentBox"></input>
          <br></br>
          <button>Submit comment</button>
        </form>
        <br></br>
        <h3>Comments</h3>
        <ul>
          {comments.map((comment) => {
            return (
              <li
                key={comment.comment_id}
                className={styles.ArticlesById__comments__li}
              >
                <p>{comment.body}</p>
                <p>Author: {comment.author}</p>
                <p>Created: {comment.created_at}</p>
                <p>Votes: {comment.votes}</p>
                <button>Delete</button>
                <button>Like</button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ArticleById;
