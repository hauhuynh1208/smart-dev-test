// Require packages and set the port
const express = require("express");
const port = 3001;
const bodyParser = require("body-parser");
const routes = require("./routes/routes");
const app = express();
var cors = require("cors");

// Use Node.js body parsing middleware
app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(cors());

routes(app);

// Start the server
const server = app.listen(port, error => {
    if (error) return console.log(`Error: ${error}`);

    console.log(`Server listening on port ${server.address().port}`);
});
