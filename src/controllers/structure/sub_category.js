const {
  get_query_database,
  post_query_database,
} = require("../../config/database_utlis");

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

exports.post_sub_category = (req, res) => {
  const { item_name, name, image_path } = req.body;
  if (!item_name || !name) {
    res.status(400).json({
      error: "item_name and name are required",
    });
  }
  name = name.toUpperCase();
  const query = `INSERT INTO sub_category(item_name, name, image_path)
    VALUES (${item_name}, '${name}', '${image_path}')`;
  const error_message = "Error adding Sub Category";
  const success_message = "Sub Category added succesfully";
  post_query_database(query, res, error_message, success_message);
};
