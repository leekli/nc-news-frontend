import styles from "../css/ArticleById.module.css";
import { getArticleById, getCommentsByArticleId } from "../utils/api";
import { useParams } from "react-router-dom";
import React, { useEffect, useState, useContext, useRef } from "react";
import LikeByArticleId from "./LikeByArticleId";
import moment from "moment";
import LikeByCommentId from "./LikeByCommentId";
import CreateNewComment from "./CreateNewComment";
import { UserContext } from "../contexts/User";
import DeleteCommentByUser from "./DeleteCommentByUser";
import DeleteArticleByUser from "./DeleteArticleByUser";
import NotLoggedInError from "./NotLoggedInError";
import "antd/dist/antd.css";
import { Comment, Tooltip, Avatar, Button, Card, List } from "antd";
import { UserOutlined } from "@ant-design/icons";

const ArticleById = () => {
  const { isLoggedIn } = useContext(UserContext);
  const { article_id } = useParams();
  const isMounted = useRef(false);
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);

  useEffect(() => {
    isMounted.current = true;
    getArticleById(article_id)
      .then((data) => {
        setArticle(data);
      })
      .then(() => {
        getCommentsByArticleId(article_id).then((data) => {
          setComments(data);
        });
      });
    return () => {
      isMounted.current = false;
    };
  }, [article_id, comments]);
  if (isLoggedIn === true) {
    return (
      <>
        <br></br>
        <div className="site-card-border-less-wrapper">
          <Card
            title={"Article " + article_id}
            bordered={false}
            style={{ width: "85%", margin: "auto" }}
            size="small"
          >
            <h2>{article.title}</h2>
            <List size="small" key="articleList" bordered>
              <List.Item
                key="articleList_comments"
                style={{ fontSize: "x-small" }}
              >
                💬 Comments: {article.comment_count}
              </List.Item>
              <List.Item
                key="articleList_authortopic"
                style={{ fontSize: "x-small" }}
              >
                Author: {article.author} | Topic: {article.topic}
              </List.Item>
              <List.Item
                key="articleList_published"
                style={{ fontSize: "x-small" }}
              >
                Published: {moment(article.created_at).format("MMMM Do YYYY")}
              </List.Item>
            </List>
            <br></br>
            <article>{article.body}</article>
            <br></br>
            <DeleteArticleByUser
              author={article.author}
              article_id={article.article_id}
            />
            <LikeByArticleId
              likes={article.votes}
              ç
              article_id={article.article_id}
            />
          </Card>
        </div>

        <hr></hr>
        <Expandable>
          <div className={styles.ArticleById__div__comments}>
            <CreateNewComment article_id={article.article_id} />
            <br></br>
            <h3>All Comments</h3>
            <ul className={styles.commentList}>
              {comments.map((comment) => {
                return (
                  <>
                    <Comment
                      author={comment.author}
                      avatar={
                        <Avatar
                          style={{
                            backgroundColor: "#031527",
                          }}
                          icon={<UserOutlined />}
                        />
                      }
                      content={<p>{comment.body}</p>}
                      style={{ margin: "auto" }}
                      datetime={
                        <Tooltip
                          title={moment(comment.created_at).format("MMM Do YY")}
                        >
                          <span style={{ color: "black", margain: "auto" }}>
                            {moment(comment.created_at).format("MMM Do YY")} (
                            {moment(comment.created_at)
                              .startOf("day")
                              .fromNow()}{" "}
                            )
                          </span>
                          <br></br>
                          <span style={{ color: "black" }}>
                            <LikeByCommentId
                              likes={comment.votes}
                              comment_id={comment.comment_id}
                            />
                            <br></br>
                            <DeleteCommentByUser
                              comment_id={comment.comment_id}
                              author={comment.author}
                            />
                          </span>
                        </Tooltip>
                      }
                    />
                  </>
                );
              })}
            </ul>
          </div>
        </Expandable>
      </>
    );
  } else {
    return (
      <>
        <NotLoggedInError />
      </>
    );
  }
};

function Expandable({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => {
          setIsOpen((currOpen) => !currOpen);
        }}
      >
        {isOpen ? "Close comments" : "Show all comments"}
      </Button>
      <br></br>
      <br></br>
      {isOpen ? children : null}
    </>
  );
}

export default ArticleById;
