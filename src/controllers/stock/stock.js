const {
  get_query_database,
  post_query_database,
} = require("../../config/database_utlis");
``;

exports.get_stocks = async (req, res) => {
  const { shop_location, date } = req.query;
  if (!date) {
    return res.status(400).json({
      err: "date is required",
    });
  }
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

    const query_params = [date];

    if (shop_location) {
      query += " AND s.shop_location = ?";
      query_params.push(shop_location);
    }

    const stocks = await get_query_database(query, query_params);
    res.json(stocks);
  } catch (err) {
    console.error("Error fetching stocks:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.post_stocks = async (req, res) => {
  const {
    bill_number,
    category,
    item_name,
    sub_category,
    brand,
    model,
    color,
    size,
    quantity,
    name,
    purchasing_price,
    selling_price,
    mrp,
  } = req.body;
  const location = req.body.location;

  if (
    !location ||
    !bill_number ||
    !category ||
    !item_name ||
    !sub_category ||
    !brand ||
    !model ||
    !color ||
    !size ||
    !quantity ||
    !name ||
    !purchasing_price ||
    !selling_price ||
    !mrp
  ) {
    return res.status(400).json({
      err: "location, bill_number, category, item_name, sub_category, brand, model, color, size, quantity, name, purchasing_price, selling_price, and mrp are required",
    });
  }

  try {
    const value_sets = [];
    const current_year = year(new Date());
    const current_date = format_date(new Date());
    const current_time = format_time(new Date());

    for (let i = 0; i < size.length; i++) {
      const current_size = size[i];
      const current_quantity = quantity[i];
      const total_price = current_quantity * selling_price;

      if (current_quantity > 0) {
        value_sets.push([
          location,
          bill_number,
          current_date,
          current_time,
          current_year,
          category,
          item_name,
          sub_category,
          brand,
          model,
          color,
          current_size,
          current_quantity,
          name,
          purchasing_price,
          selling_price,
          mrp,
          total_price,
        ]);
      }
    }

    if (value_sets.length > 0) {
      const query =
        "INSERT INTO stock (shop_location, bill_number, date, time, year, category, item_name, sub_category, brand, model, color, size, quantity, name, purchasing_price, selling_price, mrp, total_price) VALUES ?";
      await post_query_database(query, [value_sets]);
      res.status(200).json("Stock inserted successfully");
    } else {
      res.status(200).json("No data to insert");
    }
  } catch (err) {
    console.error(`Error inserting data: ${err.message}`);
    res.status(500).send("Error inserting data");
  }
};

function year() {
  return new Date().getFullYear();
}

function format_date(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function format_time(date) {
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}
