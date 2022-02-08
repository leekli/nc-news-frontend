import styles from "../css/ArticleById.module.css";
import { useState } from "react";
import { patchCommentById } from "../utils/api";

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
    <button
      onClick={() => commentLike()}
      className={styles.ArticleById__likeButton}
    >
      👍 Like ({likes})
    </button>
  );
};

export default LikeByCommentId;
