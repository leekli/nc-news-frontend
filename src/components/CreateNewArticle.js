import styles from "../css/Articles.module.css";
import React, { useState, useEffect } from "react";
import { postNewArticle, getTopics } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/User";
import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";
import NotLoggedInError from "./NotLoggedInError";

const CreateNewArticle = () => {
  const [topics, setTopics] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [newBody, setNewBody] = useState("");

  const { loggedInUser, isLoggedIn } = useContext(UserContext);

  const { TextArea } = Input;

  let navigate = useNavigate();

  useEffect(() => {
    getTopics().then((data) => {
      setTopics(data);
    });
  }, []);

  const routeChange = (path) => {
    navigate(path);
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleTopicChange = (event) => {
    setNewTopic(event.target.value);
  };

  const handleBodyChange = (event) => {
    setNewBody(event.target.value);
  };

  const handleSubmit = () => {
    if (isLoggedIn === true) {
      const newArticleDetail = {
        title: newTitle,
        topic: newTopic,
        author: loggedInUser.username,
        body: newBody,
      };

      postNewArticle(newArticleDetail)
        .then(() => {
          setNewTitle("");
          setNewTopic("");
          setNewBody("");
          routeChange(`/articles`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  if (isLoggedIn === true) {
    return (
      <>
        <br></br>
        <h3>Write a New Article:</h3>

        <Form onFinish={handleSubmit}>
          <Form.Item
            label="Article Title: "
            required
            tooltip="This is a required field"
            id="itemTitle"
            name="itemTitle"
            value={newTitle}
            rules={[
              {
                required: true,
                message: "Please input an article title!",
              },
            ]}
            onChange={handleTitleChange}
          >
            <Input placeholder="Enter an article title here..." />
          </Form.Item>
          <Form.Item
            label="Topic Name: "
            required
            tooltip="This is a required field"
            id="itemTopic"
            name="itemTopic"
            value={newTopic}
            rules={[
              {
                required: true,
                message: "Please input a topic!",
              },
            ]}
            onChange={handleTopicChange}
          >
            <select
              className={styles.selectBox__topic}
              name="itemTopicList"
              id="itemTopicList"
              value={newTopic}
              onChange={handleTopicChange}
            >
              <option value="" disabled defaultValue>
                Pick topic:
              </option>
              {topics.map((topic) => {
                return <option key={topic.slug}>{topic.slug}</option>;
              })}
            </select>
          </Form.Item>
          <Form.Item
            label="Article body: "
            id="itemBody"
            name="itemBody"
            value={newBody}
            onChange={handleBodyChange}
          >
            <TextArea
              showCount
              maxLength={5000}
              size="default"
              id="itemBody"
              name="itemBody"
              value={newBody}
              onChange={handleBodyChange}
              placeholder="Type your article content here..."
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Post Article
            </Button>
          </Form.Item>
        </Form>
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

export default CreateNewArticle;
