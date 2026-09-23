import express from 'express';
import { createPost, deletePost, getPosts, getSinglePost, updatePost } from './postsController.js';

export const routerPosts = express.Router();

routerPosts.get('/', getPosts);
routerPosts.get('/:id', getSinglePost);

routerPosts.post('/', createPost);

routerPosts.put('/:id', updatePost);

routerPosts.delete('/:id', deletePost);

