let express = require('express');
let bodyParser = require('body-parser')

var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
let exphbs = require('express-handlebars')
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// Static directory
app.use(express.static("public"));

// Routes
let routes = require("./controllers/item_controller.js");

app.use(routes);

// Starts the server to begin listening
// =============================================================

let db = require("./models/index.js");

db.sequelize.sync({force:true}).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});