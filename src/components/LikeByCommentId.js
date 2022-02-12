import styles from "../css/ArticleById.module.css";
import React, { useState, useRef } from "react";
import { patchCommentById } from "../utils/api";
import "antd/dist/antd.css";
import { Button } from "antd";

const LikeByCommentId = ({ likes, comment_id }) => {
  const [likeCommentChange, setLikeCommentChange] = useState(0);
  let btnRef = useRef();

  const commentLike = () => {
    setLikeCommentChange((currChange) => currChange + 1);
    patchCommentById(comment_id)
      .then(() => {
        if (btnRef.current) {
          btnRef.current.setAttribute("disabled", "disabled");
        }
      })
      .catch((err) => {
        console.log(err);
        setLikeCommentChange((currChange) => currChange - 1);
      });
  };

  return (
    <Button
      ref={btnRef}
      onClick={() => commentLike()}
      id="commentLikeButton"
      className={styles.ArticleById__likeButton}
      size="small"
    >
      👍 Like ({likes + likeCommentChange})
    </Button>
  );
};

export default LikeByCommentId;
