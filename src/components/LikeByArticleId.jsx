import styles from "../css/ArticleById.module.css";
import { useState, useRef } from "react";
import { patchArticleById } from "../utils/api";
import "antd/dist/antd.css";
import { Button } from "antd";

const LikeByArticleId = ({ likes, article_id }) => {
  const [likeChange, setLikeChange] = useState(0);
  let btnRef = useRef();

  const articleLike = () => {
    setLikeChange((currChange) => currChange + 1);
    patchArticleById(article_id)
      .then(() => {
        if (btnRef.current) {
          btnRef.current.setAttribute("disabled", "disabled");
        }
      })
      .catch((err) => {
        console.log(err);
        setLikeChange((currChange) => currChange - 1);
      });
  };

  return (
    <Button
      ref={btnRef}
      onClick={() => {
        articleLike();
      }}
      id="articleLikeButton"
      className={styles.ArticleById__likeButton}
      style={{ margin: "auto" }}
    >
      👍 Like ({likes + likeChange})
    </Button>
  );
};

export default LikeByArticleId;
