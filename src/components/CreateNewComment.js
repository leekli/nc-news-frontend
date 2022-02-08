import styles from "../css/ArticleById.module.css";
import React, { useState } from "react";
import { postCommentToArticleById } from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../contexts/User";

const CreateNewComment = ({ article_id }) => {
  const [newComment, setNewComment] = useState("");
  const { loggedInUser } = useContext(UserContext);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newCommentDetail = {
      author: loggedInUser.username,
      body: newComment,
    };

    postCommentToArticleById(article_id, newCommentDetail).then(() => {
      setNewComment("");
    });
  };

  return (
    <>
      <div
        className={styles.ArticleById__div__newcomment}
        onSubmit={handleSubmit}
      >
        <form>
          <label htmlFor="commentBox">Add a comment:</label>
          <input
            type="text"
            id="commentBox"
            name="commentBox"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Comment here..."
            required
          ></input>
          <br></br>
          <button>Submit comment</button>
        </form>
      </div>
    </>
  );
};

export default CreateNewComment;
