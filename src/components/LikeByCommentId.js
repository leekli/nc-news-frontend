import styles from "../css/ArticleById.module.css";
import React, { useState } from "react";
import { patchCommentById } from "../utils/api";
import "antd/dist/antd.css";
import { Button } from "antd";

const LikeByCommentId = ({ likes, comment_id }) => {
  const [likeCommentChange, setLikeCommentChange] = useState(0);

  const commentLike = () => {
    patchCommentById(comment_id)
      .then(() => {
        console.log(likeCommentChange);
        setLikeCommentChange((currChange) => currChange + 1);
      })
      .catch((err) => {
        console.log(err);
        setLikeCommentChange((currChange) => currChange - 1);
      });
  };

  return (
    <Button
      onClick={() => commentLike()}
      className={styles.ArticleById__likeButton}
      size="small"
    >
      👍 Like ({likes})
    </Button>
  );
};

export default LikeByCommentId;
