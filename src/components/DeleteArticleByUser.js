import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { deleteArticleById } from "../utils/api";
import "antd/dist/antd.css";
import { Button } from "antd";

const DeleteArticleByUser = ({ author, article_id }) => {
  const { loggedInUser } = useContext(UserContext);

  const deleteArticle = () => {
    deleteArticleById(article_id).catch((err) => {
      console.log(err);
    });
  };

  if (loggedInUser.username === author) {
    return (
      <>
        <Button
          className="deleteButton"
          onClick={() => {
            deleteArticle();
          }}
          style={{ margain: "auto" }}
        >
          ❌ Delete
        </Button>
      </>
    );
  } else {
    return <></>;
  }
};

export default DeleteArticleByUser;
