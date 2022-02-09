import styles from "../css/ArticleById.module.css";
import { useState } from "react";
import { patchArticleById } from "../utils/api";
import "antd/dist/antd.css";
import { Button } from "antd";

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
    <Button
      onClick={() => articleLike()}
      className={styles.ArticleById__likeButton}
      style={{ margain: "auto" }}
    >
      👍 Like ({likes})
    </Button>
  );
};

export default LikeByArticleId;
