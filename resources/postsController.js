import { connection } from '../data/db.js';
import { notFoundError } from '../errorMiddleware.js';

export const getPosts = async (req, res) => {

    const sql = `SELECT * FROM posts`;

    const [result] = await connection.query(sql);

    if (result.length === 0) notFoundError(req, res);

    res.send(result);

}

export const getSinglePost = async (req, res) => {

    const id = Number(req.params.id);
    if (isNaN(id)) res.json({ error: `id error`, message: `The id should be a number` });

    const sqlPost = `SELECT * FROM posts WHERE id = ?`;
    const sqlTag = `
        SELECT 
            t.label
        FROM tags t
        JOIN post_tag pt
        ON pt.tag_id = t.id
        WHERE pt.post_id = ?
    `;

    const [[resultPost]] = await connection.query(sqlPost, id);
    const [resultTag] = await connection.query(sqlTag, id);

    if (resultPost.length === 0) notFoundError(req, res);

    resultPost.labels = resultTag.map(tag => tag.label);
    console.log(resultPost)

    res.send(resultPost);
}

export const createPost = async (req, res) => {

    const sql = `INSERT INTO posts (title, content, image) VALUES ( ?, ?, ? )`;
    const { title, content, image } = req.body;

    if (title === undefined) res.json({ error: `body request error`, message: `you must have to insert the title of the post` });
    if (content === undefined) res.json({ error: `body request error`, message: `you must have to insert the content of the post` });
    if (image === undefined) res.json({ error: `body request error`, message: `you must have to insert the image of the post` });

    const [result] = await connection.query(sql, [title, content, image]);

    res.json({
        id: result.insertId,
        title,
        content,
        image
    });

}

export const updatePost = async (req, res) => {

    const id = Number(req.params.id);
    if (isNaN(id)) res.json({ error: `id error`, message: `The id should be a number` });

    const { title, content, image } = req.body;
    if (title === undefined) res.json({ error: `body request error`, message: `you must have to insert the title of the post` });
    if (content === undefined) res.json({ error: `body request error`, message: `you must have to insert the content of the post` });
    if (image === undefined) res.json({ error: `body request error`, message: `you must have to insert the image of the post` });

    const sql = `
        UPDATE posts 
        SET title = ?,
            content = ?,
            image = ?
        WHERE id = ?
    `;

    const [result] = await connection.query(sql, [title, content, image, id]);

    if (result.affectedRows === 0) notFoundError(req, res);

    res.sendStatus(204);

}

export const deletePost = async (req, res) => {

    const id = Number(req.params.id);
    if (isNaN(id)) res.json({ error: `id error`, message: `The id should be a number` });

    const sql = `DELETE FROM posts WHERE id = ?`;

    await connection.query(sql, id);

    res.sendStatus(204);

}