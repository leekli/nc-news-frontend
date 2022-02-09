import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { deleteArticleById } from "../utils/api";

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
        <button
          className="deleteButton"
          onClick={() => {
            deleteArticle();
          }}
        >
          ❌ Delete
        </button>
      </>
    );
  } else {
    return <></>;
  }
};

export default DeleteArticleByUser;
