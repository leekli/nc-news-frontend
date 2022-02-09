import styles from "../css/ArticleById.module.css";
import React, { useState } from "react";
import { postCommentToArticleById } from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import "antd/dist/antd.css";
import { Button, Input } from "antd";

const CreateNewComment = ({ article_id }) => {
  const [newComment, setNewComment] = useState("");
  const { loggedInUser } = useContext(UserContext);
  const { TextArea } = Input;

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
          <label htmlFor="commentBox"></label>
          <TextArea
            showCount
            maxLength={500}
            id="commentBox"
            name="commentBox"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Type your comment here..."
            required
          />
          <br></br>
          <Button htmlType="submit">Submit comment</Button>
        </form>
      </div>
    </>
  );
};

export default CreateNewComment;
