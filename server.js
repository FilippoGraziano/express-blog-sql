import express from 'express';
import { connection } from './data/db.js';

const app = express();
const port = 3000;

app.get('/posts', async (req, res) => {

    const sql = `SELECT * FROM posts`;

    const  [result] = await connection.query(sql);
    res.send(result);

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});