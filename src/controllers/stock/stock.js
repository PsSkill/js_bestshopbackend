const {get_query_database, post_query_database} = require("../../config/database_utlis")


exports.get_stocks = async (req, res) => {
  const { shop_location, date } = req.query;

  try {
    const query = `
      SELECT s.id, sl.name AS shop, s.date, s.time, s.name, m.name AS model_name, c.name AS color_name, si.name AS size_name, s.quantity, s.mrp, s.total_price
      FROM stock s
      INNER JOIN shop_location sl ON s.shop_location = sl.id
      INNER JOIN model m ON s.model = m.id
      INNER JOIN color c ON s.color = c.id
      INNER JOIN size si ON s.size = si.id
      WHERE s.date = ?
    `;

    const queryParams = [date];

    if (shop_location) {
      query += " AND s.shop_location = ?";
      queryParams.push(shop_location);
    }

    const stocks = await get_query_database(query, queryParams);
    res.json(stocks);
  } catch (err) {
    console.error("Error fetching stocks:", err);
    res.status(500).json({ error: err.message });
  }
};