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
  const error_message = "Error Fetching color";
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
  const success_message = "Color added succesfully";
  post_query_database(query, res, error_message, success_message);
};
