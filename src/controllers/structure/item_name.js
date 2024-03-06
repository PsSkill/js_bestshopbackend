const { get_query_database } = require("../../config/database_utlis");

exports.get_item_name = (req, res) => {
    let category = req.query.category;
    if (!category) {
        res.status(400).json({
            error: "Category is required in query!!",
        });
    }
    const query = `SELECT id, name, image_path 
    FROM item_name WHERE category = ${category} and status = '1'`;
    const error_message = "Error fetching item_name";
    get_query_database(query, res, error_message);
};
