const {
  get_query_database,
  post_query_database,
} = require("../../config/database_utlis");

exports.get_model = (req, res) => {
  let brand = req.query.brand;
  if (!brand) {
    res.status(400).json({
      error: "brand is required in query!!",
    });
  }
  const query = `SELECT id, name 
    FROM model 
    WHERE brand = ${brand} 
    AND status = '1'`;
  const error_message = "Error Fetching Model";
  get_query_database(query, res, error_message);
};

exports.post_model = (req, res) => {
  const { brand, name } = req.body;
  if (!brand || !name) {
    res.status(400).json({
      error: "brand and name are required",
    });
  }
  name = name.toUpperCase();
  const query = `INSERT INTO model(brand, name)
        VALUES (${brand}, '${name}')`;
  const error_message = "Error adding Model";
  const success_message = "Model added succesfully";
  post_query_database(query, res, error_message, success_message);
};

exports.update_model = (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    res.status(400).json({
      error: "id and name are required",
    });
  }
  name = name.toUpperCase();
  const query = `UPDATE model
    SET name = '${name}'
    WHERE id = ${id}`;
  const error_message = "Error! Failed to update Model";
  const success_message = "Model Updated successfully";
  post_query_database(query, res, error_message, success_message);
};

exports.delete_model = (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({
      error: "ID is required",
    });
  }
  const query = `UPDATE model
  SET status = '0'
  WHERE id = ${id}`;
  const error_message = "Error! Failed to delete Model";
  const success_message = "Model Deleted successfully";
  post_query_database(query, res, error_message, success_message);
};
