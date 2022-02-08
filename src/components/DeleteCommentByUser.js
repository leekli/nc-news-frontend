import styles from "../css/ArticleById.module.css";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { deleteUserCommentById } from "../utils/api";

const DeleteCommentByUser = ({ author, comment_id }) => {
  const { loggedInUser } = useContext(UserContext);

  const deleteComment = () => {
    deleteUserCommentById(comment_id).catch((err) => {
      console.log(err);
    });
  };

  if (loggedInUser.username === author) {
    return (
      <>
        <button
          className="deleteButton"
          onClick={() => {
            deleteComment();
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

export default DeleteCommentByUser;
