const {
  get_query_database,
  post_query_database,
} = require("../../config/database_utlis");

exports.get_category = (req, res) => {
  const query = `SELECT id, name, image_path
    FROM category WHERE status = '1'`;
  const error_message = "Error fetching Categories";

  get_query_database(query, res, error_message);
};

exports.post_category = (req, res) => {
  const { name, image_path } = req.body;
  if (!name) {
    res.status(400).json({
      error: "name is required!!",
    });
  }
  name = name.toUpperCase();
  const query = `INSERT INTO category(name, image_path)
    VALUES('${name}', '${image_path}')`;
  const error_message = "Error adding Category";
  const success_message = "Category added successfully";

  post_query_database(query, res, error_message, success_message);
};

exports.update_category = (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    res.status(400).json({
      error: "id and name are required",
    });
  }
  name = name.toUpperCase();
  const query = `UPDATE category
    SET name = '${name}'
    WHERE id = ${id}`;
  const error_message = "Error! Failed to Update Category";
  const success_message = "Category Updated successfully";
  post_query_database(query, res, error_message, success_message);
};

exports.delete_category = (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({
      error: "ID is required",
    });
  }
  const query = `UPDATE category
  SET status = '0'
  WHERE id =${id}`;
  const error_message = "Error! Failed to delete Category";
  const success_message = "Category Deleted successfully";
  post_query_database(query, res, error_message, success_message);
};
