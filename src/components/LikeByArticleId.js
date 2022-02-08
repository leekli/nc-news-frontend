import styles from "../css/ArticleById.module.css";
import { useState } from "react";
import { patchArticleById } from "../utils/api";

const LikeByArticleId = ({ likes, article_id }) => {
  const [likeChange, setLikeChange] = useState(0);

  const articleLike = () => {
    patchArticleById(article_id)
      .then(() => {
        setLikeChange((currChange) => currChange + 1);
        console.log(likeChange);
      })
      .catch((err) => {
        console.log(err);
        setLikeChange((currChange) => currChange - 1);
      });
  };

  return (
    <button
      onClick={() => articleLike()}
      className={styles.ArticleById__likeButton}
    >
      👍 Like ({likes})
    </button>
  );
};

export default LikeByArticleId;
