const { get_query_database } = require("../../config/database_utlis")

exports.get_color = (req, res) => {
    let model = req.query.model
    if(!model){
        res.status(400).json({
            error: "model is required in query!!",
        })
    }
    const query = `SELECT id, name
    FROM color 
    WHERE model = ${model}
    AND status = '1'`
    const error_message = "Error Fetching color"
    get_query_database(query, res, error_message)
}