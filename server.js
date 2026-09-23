import express from 'express';
import { routerPosts } from './resources/postsRouters.js';

const app = express();
const port = 3000;

app.use(`/posts`, routerPosts);

app.get(`/`, (req, res) => {
    res.send(`Home of the blog`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});