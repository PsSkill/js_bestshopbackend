const {
    get_query_database,
    post_query_database,
} = require("../../config/database_utlis");

exports.get_stocks = async (req, res) => {
    const { shop_location, date } = req.query;
    if(!date){
        return res.status(400).json({
            err:"date is required"
        })
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
            err: "location, bill_number, category, item_name, sub_category, brand, model, color, size, quantity, name, purchasing_price, selling_price and mrp are required",
        });
    }
    for (let i = 0; i < size.length; i++) {
        const currentSize = size[i];
        const currentQuantity = quantity[i];
        const total_price = currentQuantity * selling_price;

        if (currentQuantity > 0) {
            const query = `INSERT INTO stock (shop_location, bill_number, date, time, year, category, item_name, sub_category, brand, model, color, size, quantity, name, purchasing_price, selling_price, mrp, total_price) 
      VALUES (?, ?, CURDATE(), CURTIME(), YEAR(CURDATE()), ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            try {
                await post_query_database(query, [
                    location,
                    bill_number,
                    category,
                    item_name,
                    sub_category,
                    brand,
                    model,
                    color,
                    currentSize,
                    currentQuantity,
                    name,
                    purchasing_price,
                    selling_price,
                    mrp,
                    total_price,
                ]);
            } catch (err) {
                console.error(
                    `Error inserting data for size ${currentSize}: ${err.message}`
                );
                return res
                    .status(500)
                    .send(`Error inserting data for size ${currentSize}`);
            }
        }
        res.status(200).json("Stock inserted successfully");
    }
};
