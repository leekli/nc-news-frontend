import styles from "../css/ArticleById.module.css";
import { getArticleById, getCommentsByArticleId } from "../utils/api";
import { useParams } from "react-router-dom";
import { useEffect, useState, useContext, useRef } from "react";
import LikeByArticleId from "./LikeByArticleId";
import moment from "moment";
import LikeByCommentId from "./LikeByCommentId";
import CreateNewComment from "./CreateNewComment";
import { UserContext } from "../contexts/User";
import DeleteCommentByUser from "./DeleteCommentByUser";
import DeleteArticleByUser from "./DeleteArticleByUser";
import NotLoggedInError from "./NotLoggedInError";

const ArticleById = () => {
  const { isLoggedIn } = useContext(UserContext);
  const { article_id } = useParams();
  const isMounted = useRef(false);
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    isMounted.current = true;
    getArticleById(article_id)
      .then((data) => {
        setArticle(data);
      })
      .then(() => {
        getCommentsByArticleId(article_id).then((data) => {
          setComments(data);
        });
      });
    return () => {
      isMounted.current = false;
    };
  }, [article_id, comments]);

  if (isLoggedIn === true) {
    return (
      <>
        <div className={styles.ArticlesById__div__article}>
          <h2>{article.title}</h2>
          <p>Author: {article.author}</p>
          <p>Published: {moment(article.created_at).format("MMMM Do YYYY")}</p>
          <p>💬 Comments: {article.comment_count}</p>
          <p>Topic: {article.topic}</p>
          <article>{article.body}</article>
          <DeleteArticleByUser
            author={article.author}
            article_id={article.article_id}
          />
          <LikeByArticleId
            likes={article.votes}
            ç
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
                      Created: {moment(comment.created_at).format("MMM Do YY")}{" "}
                      ({moment(comment.created_at).startOf("day").fromNow()})
                    </p>
                    <DeleteCommentByUser
                      comment_id={comment.comment_id}
                      author={comment.author}
                    />
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
  } else {
    return (
      <>
        <NotLoggedInError />
      </>
    );
  }
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
