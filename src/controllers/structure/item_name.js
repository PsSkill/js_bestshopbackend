const {
  get_query_database,
  post_query_database,
} = require("../../config/database_utlis");

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

exports.post_item_name = (req, res) => {
  const { category, name, image_path } = req.body;
  if (!category || !name) {
    res.status(400).json({
      error: "category and name are required",
    });
  }
  const query = `INSERT INTO item_name(category, name, image_path) 
    VALUES (${category}, '${name}', '${image_path}')`;
  const error_message = "Error adding item_name";
  const success_message = "Item name added succesfully";
  post_query_database(query, res, error_message, success_message);
};
