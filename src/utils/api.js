import axios from "axios";

// Create a new Axios initalisation, using the 'newsApi' variable, base URL set to the backend
const newsApi = axios.create({
  baseURL: "https://lee-be-nc-news.onrender.com/api",
});

// GET Requests

export const getAllArticles = (topic, sort_by, order, search) => {
  let path = `/articles?limit=100`;
  if (topic) path += `&topic=${topic}`;
  if (sort_by) path += `&sort_by=${sort_by}`;
  if (order) path += `&order=${order}`;
  if (search) path += `&search=${search}`;
  return newsApi
    .get(path)
    .then(({ data }) => {
      return data.articles;
    })
    .catch((err) => {
      window.location = "/error";
    });
};

export const getArticleById = (article_id) => {
  return newsApi
    .get(`/articles/${article_id}`)
    .then(({ data }) => {
      return data.article;
    })
    .catch((err) => {
      window.location = "/error";
    });
};

export const getArticlesByAuthor = (author) => {
  return newsApi.get(`/articles?author=${author}`).then(({ data }) => {
    return data.articles;
  });
};

export const getCommentsByArticleId = (article_id, sort_by) => {
  let path = `/articles/${article_id}/comments`;
  if (sort_by) path += `?sort_by=${sort_by}`;
  return newsApi.get(path).then(({ data }) => {
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
  const { author, body, votes } = newCommentDetail;
  return newsApi
    .post(`/articles/${article_id}/comments`, {
      username: author,
      body: body,
      votes: votes,
    })
    .then(({ data }) => {
      return data.newComment;
    });
};

export const postNewUser = (newUserDetail) => {
  const { username, name, avatar_url } = newUserDetail;
  return newsApi
    .post(`/users`, {
      username: username,
      name: name,
      avatar_url: avatar_url,
    })
    .then(({ data }) => {
      return data.user;
    });
};

export const postNewTopic = (newTopicDetail) => {
  const { slug, description } = newTopicDetail;
  return newsApi
    .post(`/topics`, {
      slug: slug,
      description: description,
    })
    .then(({ data }) => {
      return data.topic;
    });
};

export const postNewArticle = (newArticleDetail) => {
  const { title, topic, author, body } = newArticleDetail;
  return newsApi
    .post(`/articles`, {
      title: title,
      topic: topic,
      author: author,
      body: body,
    })
    .then(({ data }) => {
      return data.article;
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
