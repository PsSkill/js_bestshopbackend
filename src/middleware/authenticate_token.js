const jwt = require('jsonwebtoken');
const {get_query_database} = require("../config/database_utlis")
const JWT_SECRET = "hehe i am not a evil guy okieee";

const authenticate_token = async(req, res, next) =>{
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const query = `SELECT name FROM master_user WHERE id = ?`;
        const [user] = await get_query_database(query, [decoded.id]);
        if (!user) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        }
        req.user_id = decoded.id;
        req.location = decoded.location;
        next();
    }catch (err) {
        console.error('Authentication error:', err);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
}
module.exports = authenticate_token;