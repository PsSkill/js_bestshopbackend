const jwt = require('jsonwebtoken');
const {get_query_database} = require("../config/database_utlis")
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const authenticate_token = async(req, res, next) =>{
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const query = `SELECT name FROM master_user WHERE id = ?`;
        const [user] = await get_query_database(query, [decoded.id]);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
        req.body.user_id = decoded.id;
        req.body.location = decoded.location;
        next();
    }catch (err) {
        console.error('Authentication error:', err);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
}
module.exports = authenticate_token;