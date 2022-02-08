import axios from "axios";

// Create a new Axios initalisation, using the 'newsApi' variable, base URL set to the backend
const newsApi = axios.create({
  baseURL: "https://lee-nc-news.herokuapp.com/api",
});

// GET Requests

export const getAllArticles = (topic, sort_by, order) => {
  let path = `/articles?limit=100`;
  if (topic) path += `&topic=${topic}`;
  if (sort_by) path += `&sort_by=${sort_by}`;
  if (order) path += `&order=${order}`;
  return newsApi.get(path).then(({ data }) => {
    return data.articles;
  });
};

export const getArticleById = (article_id) => {
  return newsApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const getArticlesByAuthor = (author) => {
  return newsApi.get(`/articles?author=${author}`).then(({ data }) => {
    return data.articles;
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

export const postCommentToArticleById = (article_id, newCommentDetail) => {
  const { author, body } = newCommentDetail;
  return newsApi
    .post(`/articles/${article_id}/comments`, {
      username: author,
      body: body,
    })
    .then(({ data }) => {
      return data.newComment;
    });
};

// PATCH, PUT Requests

export const patchArticleById = (article_id) => {
  return newsApi
    .patch(`/articles/${article_id}`, { inc_votes: 1 })
    .then(({ data }) => {
      return data.article;
    });
};

export const patchCommentById = (comment_id) => {
  return newsApi
    .patch(`/comments/${comment_id}`, { inc_votes: 1 })
    .then(({ data }) => {
      return data.comment;
    });
};

// DELETE Requests

export const deleteUserCommentById = (comment_id) => {
  return newsApi.delete(`/comments/${comment_id}`).catch((err) => {
    console.log(err);
  });
};

export const deleteArticleById = (article_id) => {
  return newsApi.delete(`/articles/${article_id}`).catch((err) => {
    console.log(err);
  });
};
