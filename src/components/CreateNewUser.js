import React, { useState } from "react";
import { postNewUser } from "../utils/api";
import { useNavigate } from "react-router-dom";
import "antd/dist/antd.css";
import { Form, Input, Button } from "antd";

const CreateNewUser = () => {
  const [newUsername, setNewUsername] = useState("");
  const [newName, setNewName] = useState("");
  const [newAvatarURL, setAvatarURL] = useState("");

  let navigate = useNavigate();

  const routeChange = (path) => {
    navigate(path);
  };

  const handleUsernameChange = (event) => {
    setNewUsername(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleAvatarURLChange = (event) => {
    setAvatarURL(event.target.value);
  };

  const handleSubmit = () => {
    const newUserDetail = {
      username: newUsername,
      name: newName,
      avatar_url: newAvatarURL,
    };

    postNewUser(newUserDetail)
      .then(() => {
        setNewUsername("");
        setNewName("");
        setAvatarURL("");
        routeChange(`/users`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <h3>Create a New User:</h3>

      <Form onFinish={handleSubmit}>
        <Form.Item
          label="Username: "
          required
          tooltip="This is a required field"
          id="itemUsername"
          name="itemUsername"
          value={newUsername}
          rules={[
            {
              required: true,
              message: "Please input a username!",
            },
          ]}
          onChange={handleUsernameChange}
        >
          <Input placeholder="Enter a username here..." />
        </Form.Item>
        <Form.Item
          label="Your Name: "
          id="itemName"
          name="itemName"
          value={newName}
          onChange={handleNameChange}
          tooltip="This is a required field"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
          required
        >
          <Input placeholder="Enter your name here..." />
        </Form.Item>
        <Form.Item
          label="Link to Avatar Image: "
          id="itemAvatarURL"
          name="itemAvatarURL"
          value={newAvatarURL}
          onChange={handleAvatarURLChange}
        >
          <Input placeholder="Enter URL here..." />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default CreateNewUser;
