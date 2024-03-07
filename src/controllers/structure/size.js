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
  const error_message = "Error Fetching size";
  get_query_database(query, res, error_message);
};

exports.post_size = (req, res) => {
  const { color, size } = req.body;
  if (!color || !size) {
    res.status(400).json({
      error: "color and size are required",
    });
  }
  const query = `INSERT INTO size(color, size)
  VALUES (${color}, '${size}')`;
  const error_message = "Error adding size";
  const success_message = "Size added Succesfully";
  post_query_database(query, res, error_message, success_message);
};
