import { deleteUserCommentById } from "../utils/api";
import "antd/dist/antd.css";
import { Button } from "antd";

const DeleteCommentByUser = ({ author, comment_id, comments, setComments }) => {
  const username = JSON.parse(localStorage.getItem("username"));

  const deleteComment = () => {
    deleteUserCommentById(comment_id)
      .then(() => {
        setComments((oldComments) => {
          const newComments = oldComments.filter((comment) => {
            return comment.comment_id !== comment_id;
          });
          return newComments;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (username === author) {
    return (
      <>
        <Button
          className="deleteButton"
          onClick={() => {
            deleteComment();
          }}
          size="small"
          style={{ margin: "auto" }}
        >
          ❌ Delete
        </Button>
      </>
    );
  } else {
    return <></>;
  }
};

export default DeleteCommentByUser;
