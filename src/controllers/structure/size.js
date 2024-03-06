const { get_query_database } = require("../../config/database_utlis")

exports.get_size = (req, res) => {
    let color = req.query.color
    if(!color){
        res.status(400).json({
            error: "color is required in query!!",
        })
    }
    const query = `SELECT id, name
    FROM size 
    WHERE color = ${color}
    AND status = '1'`
    const error_message = "Error Fetching size"
    get_query_database(query, res, error_message)
}