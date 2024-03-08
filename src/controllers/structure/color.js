const {
  get_query_database,
  post_query_database,
} = require("../../config/database_utlis");

exports.get_color = (req, res) => {
  let model = req.query.model;
  if (!model) {
    res.status(400).json({
      error: "model is required in query!!",
    });
  }
  const query = `SELECT id, name
    FROM color 
    WHERE model = ${model}
    AND status = '1'`;
  const error_message = "Error Fetching Color";
  get_query_database(query, res, error_message);
};

exports.post_color = (req, res) => {
  const { model, name } = req.body;
  if (!model || !name) {
    res.status(400).json({
      error: "model and color name are required",
    });
  }
  name = name.toUpperCase();
  const query = `INSERT INTO color(model, name)
  VALUES (${model}, '${name}')`;
  const error_message = "Error adding Color";
  const success_message = "Color added successfully";
  post_query_database(query, res, error_message, success_message);
};

exports.update_color = (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    res.status(400).json({
      error: "id and name are required",
    });
  }
  name = name.toUpperCase();
  const query = `UPDATE color
    SET name = '${name}'
    WHERE id = ${id}`;
  const error_message = "Error! Failed to Update Color";
  const success_message = "Color Updated successfully";
  post_query_database(query, res, error_message, success_message);
};

exports.delete_color = (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({
      error: "ID is required",
    });
  }
  const query = `UPDATE color
  SET status = '0'
  WHERE id = ${id}`;
  const error_message = "Error! Failed to delete Color";
  const success_message = "Color Deleted successfully";
  post_query_database(query, res, error_message, success_message);
};
