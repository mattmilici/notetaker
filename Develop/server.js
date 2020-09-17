const express = require("express");
const app = express();
const path = require("path");

//what is the server going to look like
const PORT = process.env.PORT || 3000;

//TBD
app.use(express.urlencoded({ extended: true }));

//allows us to send json files
app.use(express.json());

//our base server is going into the directories below
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

//lets start it
app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});