const { get_query_database } = require("../../config/database_utlis")

exports.get_category = (req, res)=>{
    const query = `SELECT id, name, image_path
    FROM category WHERE status = '1'`
    const error_message= 'Error fetching Categories'

    get_query_database(query, res, error_message)
}