import styles from "../css/ArticleById.module.css";
import { getArticleById, getCommentsByArticleId } from "../utils/api";
import { useParams } from "react-router-dom";
import React, { useEffect, useState, useContext } from "react";
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
import LoadingSpin from "./LoadingSpin";

const ArticleById = () => {
  const { isLoggedIn } = useContext(UserContext);
  const { article_id } = useParams();
  const [article, setArticle] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("");

  const LoggedInCheck = JSON.parse(localStorage.getItem("isLoggedIn"));

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  useEffect(() => {
    getArticleById(article_id)
      .then((data) => {
        setArticle(data);
      })
      .then(() => {
        getCommentsByArticleId(article_id, sortBy).then((data) => {
          setComments(data);
        });
      })
      .then(() => {
        setIsLoading(false);
      });
  }, [article_id, sortBy]);

  if (isLoggedIn === true || LoggedInCheck === true) {
    return isLoading ? (
      <LoadingSpin />
    ) : (
      <>
        <br></br>
        <div className={styles.singleArticle__div}>
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
              article_id={article.article_id}
            />
          </Card>
        </div>

        <hr></hr>
        <Expandable>
          <div className={styles.ArticleById__div__comments}>
            <CreateNewComment
              article_id={article.article_id}
              setComments={setComments}
            />
            <br></br>
            <h3>All Comments</h3>

            <div className="select">
              <select
                className={styles.selectBox}
                name="sortList"
                id="sortList"
                value={sortBy}
                onChange={handleSortByChange}
              >
                <option value="" disabled defaultValue>
                  Sort comments by:
                </option>
                <option value="created_at">Date created (Latest)</option>
                <option value="votes">Likes (Highest)</option>
              </select>
            </div>

            <ul className={styles.commentList}>
              <>
                <List
                  itemLayout="vertical"
                  size="large"
                  pagination={{
                    pageSize: 10,
                  }}
                  dataSource={comments}
                  renderItem={(comment) => (
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
                            title={moment(comment.created_at).format(
                              "MMM Do YY"
                            )}
                          >
                            <span style={{ color: "black", margin: "auto" }}>
                              {moment(comment.created_at).format("MMM Do YY")} (
                              {moment(comment.created_at)
                                .startOf("day")
                                .fromNow()}{" "}
                              )
                            </span>
                          </Tooltip>
                        }
                      />
                      <List.Item
                        key={comment.comment_id}
                        style={{ display: "block", margin: "0 auto" }}
                        extra={
                          <>
                            <span style={{ color: "black" }}>
                              <DeleteCommentByUser
                                comment_id={comment.comment_id}
                                author={comment.author}
                                comments={comments}
                                setComments={setComments}
                              />
                              <LikeByCommentId
                                likes={comment.votes}
                                comment_id={comment.comment_id}
                              />
                            </span>
                          </>
                        }
                      ></List.Item>
                    </>
                  )}
                />
              </>
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
