import styles from "../css/ArticleById.module.css";
import { useState } from "react";
import { patchArticleById } from "../utils/api";

const LikeByArticleId = ({ likes, article_id }) => {
  const [likeChange, setLikeChange] = useState(0);

  const articleLike = () => {
    setLikeChange((currChange) => currChange + 1);
    patchArticleById(article_id).catch((err) => {
      console.log(err);
      setLikeChange((currChange) => currChange - 1);
    });
  };

  return (
    <button
      onClick={() => articleLike()}
      className={styles.ArticleById__likeButton}
    >
      👍 Like ({likes + likeChange})
    </button>
  );
};

export default LikeByArticleId;
