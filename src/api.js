import axios from 'axios';

/**
 * API Configuration
 * Base URL: http://localhost:8080/api
 * withCredentials: true enables sending cookies with requests (for JWT token)
 */
const API_URL = 'https://threew-social-app-backend.onrender.com/api';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true,  // Allow cookies (JWT token)
});

/**
 * AUTHENTICATION ENDPOINTS
 * Handles user registration and login
 */
export const signup = (username, email, password) =>
    api.post('/auth/signup', { username, email, password });

export const login = (email, password) =>
    api.post('/auth/login', { email, password });

/**
 * POST ENDPOINTS
 * Handles post creation, retrieval, and interactions (likes/comments)
 */
export const createPost = (content, image) =>
    api.post('/posts', { content, image });

export const getAllPosts = () =>
    api.get('/posts');

// Like/Unlike operations
export const likePost = (postId) =>
    api.post(`/posts/${postId}/like`);

export const unlikePost = (postId) =>
    api.post(`/posts/${postId}/unlike`);

// Comment operations
export const addComment = (postId, text) =>
    api.post(`/posts/${postId}/comment`, { text });

export const deleteComment = (postId, commentId) =>
    api.delete(`/posts/${postId}/comment/${commentId}`);

export default api;
