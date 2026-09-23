import express from 'express';
import { getPosts } from './postsController.js';

export const routerPosts = express.Router();

routerPosts.get('/', getPosts);
