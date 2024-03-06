const { get_query_database } = require("../../config/database_utlis")

exports.get_brand = (req, res) => {
    let sub_category = req.query.sub_category
    if(!sub_category){ 
        res.status(400).json({
            error: "Sub_category is required in query!!",
        })
    }
    const query = `SELECT id, name, image_path 
    FROM brand 
    WHERE sub_category = ${sub_category} 
    AND status = '1'`
    const error_message = "Error Fetching brand"
    get_query_database(query, res, error_message)
}