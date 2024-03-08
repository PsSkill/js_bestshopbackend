const {
  get_query_database,
  post_query_database,
} = require("../../config/database_utlis");

exports.get_brand = (req, res) => {
  let sub_category = req.query.sub_category;
  if (!sub_category) {
    res.status(400).json({
      error: "Sub_category is required in query!!",
    });
  }
  const query = `SELECT id, name, image_path 
    FROM brand 
    WHERE sub_category = ${sub_category} 
    AND status = '1'`;
  const error_message = "Error Fetching brand";
  get_query_database(query, res, error_message);
};

exports.post_brand = (req, res) => {
  const { sub_category, name, image_path } = req.body;
  if (!sub_category || !name) {
    res.status(400).json({
      error: "sub_category and name are required",
    });
  }
  name = name.toUpperCase();
  const query = `INSERT INTO brand(sub_category, name, image_path)
      VALUES (${sub_category}, '${name}', '${image_path}')`;
  const error_message = "Error adding Brand";
  const success_message = "Brand added successfully";
  post_query_database(query, res, error_message, success_message);
};

exports.update_brand = (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    res.status(400).json({
      error: "id and name are required",
    });
  }
  name = name.toUpperCase();
  const query = `UPDATE brand
    SET name = '${name}'
    WHERE id = ${id}`;
  const error_message = "Error! Failed to Update Brand";
  const success_message = "Brand Updated successfully";
  post_query_database(query, res, error_message, success_message);
};

exports.delete_brand = (req, res) => {
  const { id } = req.body;
  if (!id) {
    res.status(400).json({
      error: "ID is required",
    });
  }
  const query = `UPDATE brand
  SET status = '0'
  WHERE id =${id}`;
  const error_message = "Error! Failed to delete Brand";
  const success_message = "Brand Deleted successfully";
}
