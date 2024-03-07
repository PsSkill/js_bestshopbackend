const { get_query_database, post_query_database } = require("../../config/database_utlis")

exports.get_category = (req, res)=>{
    const query = `SELECT id, name, image_path
    FROM category WHERE status = '1'`
    const error_message= 'Error fetching Categories'

    get_query_database(query, res, error_message)
}

exports.post_category = (req, res)=>{
    const {name, image_path} = req.body
    if(!name){
        res.status(400).json({
            error:"name is required!!"
        })
    }
    name = name.toUpperCase();
    const query = `INSERT INTO category(name, image_path)
    VALUES('${name}', '${image_path}')`
    const error_message = "Error adding category"
    const success_message = "Category added successfully"

    post_query_database(query, res, error_message, success_message)
}