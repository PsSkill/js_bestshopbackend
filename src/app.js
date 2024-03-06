// src/app.js
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const body_parser = require("body-parser")

//routes
const structure_routes = require("./routes/structure/structure");


//middleware logger config
const morgan_config = morgan(
    ":method :url :status :res[content-length] - :response-time ms"
);

const app = express();
const port = 5000;

// Enable CORS AND LOGGER MIDDLEWARE
app.use(cors());
app.use(morgan_config);
app.use(body_parser.json())

app.use("/api/structure", structure_routes);

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
