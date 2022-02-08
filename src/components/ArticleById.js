import styles from "../css/ArticleById.module.css";
import { getArticleById, getCommentsByArticleId } from "../utils/api";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LikeByArticleId from "./LikeByArticleId";
import moment from "moment";
import LikeByCommentId from "./LikeByCommentId";
import CreateNewComment from "./CreateNewComment";

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
  }, [article_id, comments]);

  return (
    <>
      <div className={styles.ArticlesById__div__article}>
        <h2>{article.title}</h2>
        <p>Author: {article.author}</p>
        <p>Published: {moment(article.created_at).format("MMMM Do YYYY")}</p>
        <p>💬 Comments: {article.comment_count}</p>
        <p>Topic: {article.topic}</p>
        <article>{article.body}</article>
        <button>❌ Delete</button>
        <LikeByArticleId
          likes={article.votes}
          article_id={article.article_id}
        />
      </div>
      <hr></hr>
      <Expandable>
        <div className={styles.ArticleById__div__comments}>
          <CreateNewComment article_id={article.article_id} />
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
                  <p>id {comment.comment_id}</p>
                  <p>Author: {comment.author}</p>
                  <p>
                    Created: {moment(comment.created_at).format("MMM Do YY")} (
                    {moment(comment.created_at).startOf("day").fromNow()})
                  </p>
                  <button>❌ Delete</button>
                  <LikeByCommentId
                    likes={comment.votes}
                    comment_id={comment.comment_id}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </Expandable>
    </>
  );
};

function Expandable({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => {
          setIsOpen((currOpen) => !currOpen);
        }}
      >
        {isOpen ? "Close comments" : "Show all comments"}
      </button>
      <br></br>
      <br></br>
      {isOpen ? children : null}
    </>
  );
}

export default ArticleById;
