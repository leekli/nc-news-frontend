import { useContext } from "react";
import { UserContext } from "../contexts/User";
import { deleteUserCommentById } from "../utils/api";
import "antd/dist/antd.css";
import { Button } from "antd";

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
        <Button
          className="deleteButton"
          onClick={() => {
            deleteComment();
          }}
          size="small"
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

export default DeleteCommentByUser;
