import styles from "../css/Articles.module.css";
import React, { useEffect, useState, useContext } from "react";
import { getAllArticles } from "../utils/api";
import { Link, useSearchParams } from "react-router-dom";
import moment from "moment";
import { UserContext } from "../contexts/User";
import LoadingSpin from "./LoadingSpin";
import "antd/dist/antd.css";
import { List, Space, Input, Button } from "antd";
import { MessageOutlined, LikeOutlined, ReadOutlined } from "@ant-design/icons";
import NotLoggedInError from "./NotLoggedInError";
import { useNavigate } from "react-router-dom";

const Articles = () => {
  const { isLoggedIn } = useContext(UserContext);

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [orderBy, setOrderBy] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [newSearchItem, setNewSearchItem] = useState("");

  let navigate = useNavigate();

  const topic = searchParams.get("topic");

  const LoggedInCheck = JSON.parse(localStorage.getItem("isLoggedIn"));

  const { Search } = Input;

  const handleOrderByChange = (event) => {
    setOrderBy(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchItemChange = (event) => {
    setNewSearchItem(event.target.value);
  };

  useEffect(() => {
    getAllArticles(topic, sortBy, orderBy, newSearchItem).then(
      (articlesFromApi) => {
        setArticles(articlesFromApi);
        setIsLoading(false);
      }
    );
  }, [topic, sortBy, orderBy, newSearchItem]);

  const routeChange = (path) => {
    navigate(path);
  };

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  if (isLoggedIn === true || LoggedInCheck === true) {
    return isLoading ? (
      <LoadingSpin />
    ) : (
      <>
        <div className={styles.Articles__div}>
          <br></br>
          <Space direction="vertical">
            <Search
              id="searchBar"
              name="searchBar"
              size="middle"
              style={{ width: "80vw" }}
              placeholder="Search for article..."
              value={newSearchItem}
              onChange={handleSearchItemChange}
              enterButton
            />
          </Space>
          <br></br>
          <br></br>
          <div className="select">
            <select
              className={styles.selectBox}
              name="sortList"
              id="sortList"
              value={sortBy}
              onChange={handleSortByChange}
            >
              <option value="" disabled defaultValue>
                Sort by:
              </option>
              <option value="created_at">Date created</option>
              <option value="comment_count">Comment count</option>
              <option value="votes">Likes</option>
            </select>{" "}
            <select
              className={styles.selectBox}
              name="orderList"
              id="orderList"
              value={orderBy}
              onChange={handleOrderByChange}
            >
              <option value="" disabled defaultValue>
                Order by:
              </option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <br></br>
          <div>
            <Button
              danger
              onClick={() => {
                routeChange(`/articles/create`);
              }}
            >
              Write a New Article
            </Button>
          </div>
          <br></br>
          <div>
            <h2>All articles:</h2>
          </div>
          <List
            itemLayout="vertical"
            size="large"
            pagination={{
              pageSize: 10,
            }}
            dataSource={articles}
            renderItem={(item) => (
              <List.Item
                key={item.title}
                actions={[
                  <IconText
                    icon={LikeOutlined}
                    text={item.votes}
                    key="list-vertical-like-o"
                  />,
                  <IconText
                    icon={MessageOutlined}
                    text={item.comment_count}
                    key="list-vertical-message"
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={<ReadOutlined />}
                  title={
                    <Link
                      key={item.article_id}
                      to={`/articles/${item.article_id}`}
                    >
                      {item.title}
                    </Link>
                  }
                  description={moment(item.created_at).format("MMMM Do YYYY")}
                />
              </List.Item>
            )}
          />
        </div>
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

export default Articles;
