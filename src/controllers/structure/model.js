const { get_query_database } = require("../../config/database_utlis")

exports.get_model = (req, res) => {
    let brand = req.query.brand
    if(!brand){
        res.status(400).json({
            error: "brand is required in query!!",
        })
    }
    const query = `SELECT id, name 
    FROM model 
    WHERE brand = ${brand} 
    AND status = '1'`
    const error_message = "Error Fetching model"
    get_query_database(query, res, error_message)
}