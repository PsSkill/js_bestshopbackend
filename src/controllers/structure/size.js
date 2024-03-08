const { query } = require("express");
const {
  get_query_database,
  post_query_database,
} = require("../../config/database_utlis");

exports.get_size = (req, res) => {
  let color = req.query.color;
  if (!color) {
    res.status(400).json({
      error: "color is required in query!!",
    });
  }
  const query = `SELECT id, name
    FROM size 
    WHERE color = ${color}
    AND status = '1'`;
  const error_message = "Error Fetching Size";
  get_query_database(query, res, error_message);
};

exports.post_size = (req, res) => {
  const { color, name } = req.body;
  if (!color || !name) {
    res.status(400).json({
      error: "color and size name are required",
    });
  }
  name = name.toUpperCase();
  const query = `INSERT INTO size(color, name)
  VALUES (${color}, '${name}')`;
  const error_message = "Error adding Size";
  const success_message = "Size added successfully";
  post_query_database(query, res, error_message, success_message);
};

exports.update_size = (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    res.status(400).json({
      error: "id and name are required",
    });
  }

  name = name.toUpperCase();
  const query = `UPDATE size
    SET name = '${name}'\
    WHERE id = ${id}`;
  const error_message = "Error! Failed to Update Size";
  const success_message = "Size Updated successfully";
  post_query_database(query, res, error_message, success_message);
};

exports.delete_size = (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({
      error: "ID is required",
    });
  }
  const query = `UPDATE size
  SET status = '0'
  WHERE id = ${id}`;
  const error_message = "Error! Failed to delete Size";
  const success_message = "Size Deleted successfully";
  post_query_database(query, res, error_message, success_message);
};
