import { deleteArticleById } from "../utils/api";
import { useNavigate } from "react-router-dom";
import "antd/dist/antd.css";
import { Button } from "antd";

const DeleteArticleByUser = ({ author, article_id }) => {
  const username = JSON.parse(localStorage.getItem("username"));

  let navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path);
  };

  const deleteArticle = () => {
    deleteArticleById(article_id)
      .then(() => {
        routeChange(`/articles`);
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
            deleteArticle();
          }}
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

export default DeleteArticleByUser;
