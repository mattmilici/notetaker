var path = require("path");
var express = require("express");

module.exports = function(app) {
    //allows us to acces js/css files that are on the front end
    app.use("/assets", express.static(path.join(__dirname, "../assets")));

    app.get("/notes", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // If no matching route is found default to home
    app.get("*", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
};