// Setup Express
const express = require("express");
const app = express();
const port = 3300;

// Setup Handlebars
const handlebars = require("express-handlebars");
app.engine("handlebars", handlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Setup body-parser
app.use(express.urlencoded({ extended: false }));

// Make the "public" folder available statically
const path = require("path");
app.use(express.static(path.join(__dirname, "public")));

// Setup routes
app.use(require("./routes/app-routes.js"));

// Start the server running.
app.listen(port, function () {
    console.log(`App listening on port ${port}!`);
});