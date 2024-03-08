const { error } = require("console");
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
  const error_message = "Error Fetching Sub Category";
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
  const success_message = "Sub Category added successfully";
  post_query_database(query, res, error_message, success_message);
};

exports.update_sub_category = (req, res) => {
  const { id, name } = res.body;
  if (!id || !name) {
    res.status(400).json({
      error: "id and name are required",
    });
  }
  name = name.toUpperCase();
  const query = `UPDATE sub_category
    SET name = '${name}'
    WHERE id = ${id}`;
  const error_message = "Error! Failed to Update Sub-category";
  const success_message = "Sub-category Updated successfully";
  post_query_database(query, res, error_message, success_message);
};

exports.delete_sub_category = (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({
      error: "ID is required",
    });
  }
  const query = `UPDATE sub_category
  SET status = '0'
  WHERE id = ${id}`;
  const error_message = "Error! Failed to delete Sub Category";
  const success_message = "Sub Category Deleted successfully";
  post_query_database(query, res, error_message, success_message);
};
