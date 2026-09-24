
export const notFoundError = (req, res) => {
    res.status(404).json({ error: `not found`, message: `Post or posts at ${req.path} not found` })
};
