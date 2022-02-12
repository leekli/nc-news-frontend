import React, { useState, useContext } from "react";
import { postNewTopic } from "../utils/api";
import { useNavigate } from "react-router-dom";
import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";
import { UserContext } from "../contexts/User";
import NotLoggedInError from "./NotLoggedInError";

const CreateNewTopic = () => {
  const [newSlug, setNewSlug] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const { isLoggedIn } = useContext(UserContext);
  const LoggedInCheck = JSON.parse(localStorage.getItem("isLoggedIn"));

  let navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path);
  };

  const handleSlugChange = (event) => {
    setNewSlug(event.target.value);
  };

  const handleDescChange = (event) => {
    setNewDesc(event.target.value);
  };

  const handleSubmit = () => {
    const newTopicDetail = {
      slug: newSlug,
      description: newDesc,
    };

    postNewTopic(newTopicDetail)
      .then(() => {
        setNewSlug("");
        setNewDesc("");
        routeChange(`/topics`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoggedIn === true || LoggedInCheck === true) {
    return (
      <>
        <h3>Create a New Topic:</h3>

        <Form onFinish={handleSubmit}>
          <Form.Item
            label="New Topic Name: "
            required
            tooltip="This is a required field"
            id="itemTopic"
            name="itemTopic"
            value={newSlug}
            rules={[
              {
                required: true,
                message: "Please input a new topic name!",
              },
            ]}
            onChange={handleSlugChange}
          >
            <Input placeholder="Enter a new Topic name here..." />
          </Form.Item>
          <Form.Item
            label="New Topic Description: "
            id="itemDesc"
            name="itemDesc"
            value={newDesc}
            onChange={handleDescChange}
          >
            <Input placeholder="Enter new Topic description here..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
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

export default CreateNewTopic;
