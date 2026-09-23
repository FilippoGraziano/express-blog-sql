import { connection } from '../data/db.js';

export const getPosts = async (req, res) => {

    const sql = `SELECT * FROM posts`;

    const [result] = await connection.query(sql);
    res.send(result);
    
}