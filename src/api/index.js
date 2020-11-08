import axios from "axios";

const url =
  process.env.NODE_ENV === "production"
    ? "https://memories-automedon.herokuapp.com"
    : "http://localhost:5000";

export const fetchPosts = () => axios.get(`${url}/posts`);
export const createPost = (newPost) => axios.post(`${url}/posts`, newPost);
export const updatePost = (id, updatedPost) =>
  axios.patch(`${url}/posts/${id}`, updatedPost);
export const deletePost = (id) => axios.delete(`${url}/posts/${id}`);
export const likePost = (id) => axios.patch(`${url}/posts/${id}/likePost`);
