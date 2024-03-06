const { get_query_database } = require("../../config/database_utlis");

exports.get_sub_category = (req, res) => {
    let item_name = req.query.item_name;
    if (!item_name) {
        res.status(400).json({
            error: "Item_name is required in query!!",
        });
    }
    const query = `SELECT id, name, image_path 
    FROM sub_category 
    WHERE item_name = ${item_name} 
    AND status = '1'`;
    const error_message = "Error fetching Sub Category";
    get_query_database(query, res, error_message);
};
