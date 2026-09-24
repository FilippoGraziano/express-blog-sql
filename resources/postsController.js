import { connection } from '../data/db.js';

export const getPosts = async (req, res) => {

    const sql = `SELECT * FROM posts`;

    const [result] = await connection.query(sql);
    res.send(result);

}

export const getSinglePost = async (req, res) => {

    const id = req.params.id;
    const sql = `SELECT * FROM posts WHERE id = ?`;

    const [result] = await connection.query(sql, id);

    res.send(result);
}

export const createPost = async (req, res) => {

    const sql = `INSERT INTO posts (title, content, image) VALUES ( ?, ?, ? )`;
    const { title, content, image } = req.body;

    const [result] = await connection.query(sql, [title, content, image]);

    res.json({
        id: result.insertId,
        title,
        content,
        image
    });

}

export const updatePost = async (req, res) => {

    const id = req.params.id;
    const { title, content, image } = req.body;
    const sql = `
        UPDATE posts 
        SET title = ?,
            content = ?,
            image = ?
        WHERE id = ?
    `;

    connection.query(sql, [ title, content, image, id ]);

    res.sendStatus(204);

}

export const deletePost = async (req, res) => {

    const id = req.params.id;
    const sql = `DELETE FROM posts WHERE id = ?`;

    connection.query(sql, id);

    res.sendStatus(204);
}