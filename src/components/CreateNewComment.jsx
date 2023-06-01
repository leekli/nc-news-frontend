import styles from "../css/ArticleById.module.css";
import React, { useState } from "react";
import { postCommentToArticleById } from "../utils/api";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import "antd/dist/antd.css";
import { Button, Input } from "antd";
import NotLoggedInError from "./NotLoggedInError";

const CreateNewComment = ({ article_id, setComments }) => {
  const [newComment, setNewComment] = useState("");
  const { isLoggedIn } = useContext(UserContext);
  const { TextArea } = Input;

  const username = JSON.parse(localStorage.getItem("username"));
  const LoggedInCheck = JSON.parse(localStorage.getItem("isLoggedIn"));

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newCommentDetail = {
      author: username,
      body: newComment,
      votes: 0,
    };

    postCommentToArticleById(article_id, newCommentDetail)
      .then(() => {
        setComments((current) => {
          return [newCommentDetail, ...current];
        });
      })
      .then(() => {
        setNewComment("");
      });
  };

  if (isLoggedIn === true || LoggedInCheck === true) {
    return (
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
    );
  } else {
    return (
      <>
        <NotLoggedInError />
      </>
    );
  }
};

export default CreateNewComment;
