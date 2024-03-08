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
  const error_message = "Error Fetching Item Name";
  get_query_database(query, res, error_message);
};

exports.post_item_name = (req, res) => {
  const { category, name, image_path } = req.body;
  if (!category || !name) {
    res.status(400).json({
      error: "category and name are required",
    });
  }
  name = name.toUpperCase();
  const query = `INSERT INTO item_name(category, name, image_path) 
  VALUES (${category}, '${name}', '${image_path}')`;
  const error_message = "Error adding Item Name";
  const success_message = "Item Name added successfully";
  post_query_database(query, res, error_message, success_message);
};

exports.update_item_name = (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    res.status(400).json({
      error: "id and name are required",
    });
  }
  name = name.toUpperCase();
  const query = `UPDATE item_name
    SET name = '${name}'
    WHERE id = ${id}`;
  const error_message = "Error! Failed to update Item Name";
  const success_message = "Item Name Updated succesSfully";
  post_query_database(query, res, error_message, success_message);
};

exports.delete_item_name = (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({
      error: "ID is required",
    });
  }
  const query = `UPDATE item_name
  SET status = '0'
  WHERE id = ${id}`;
  const error_message = "Error! Failed to delete Item Name";
  const success_message = "Item Name Deleted successfully";
  post_query_database(query, res, error_message, success_message);
};
