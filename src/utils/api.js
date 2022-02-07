import axios from "axios";

// Create a new Axios initalisation, using the 'newsApi' variable, base URL set to the backend
const newsApi = axios.create({
  baseURL: "https://lee-nc-news.herokuapp.com/api",
});

// GET Requests

export const getAllArticles = () => {
  return newsApi.get("/articles").then(({ data }) => {
    return data.articles;
  });
};

export const getArticleById = (article_id) => {
  return newsApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const getCommentsByArticleId = (article_id) => {
  return newsApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const getTopics = () => {
  return newsApi.get(`/topics`).then(({ data }) => {
    return data.topics;
  });
};

export const getUsers = () => {
  return newsApi.get(`/users`).then(({ data }) => {
    return data.users;
  });
};

export const getUserByUsername = (username) => {
  return newsApi.get(`/users/${username}`).then(({ data }) => {
    return data.user;
  });
};

// POST Requests

// PATCH, PUT Requests

// DELETE Requests
