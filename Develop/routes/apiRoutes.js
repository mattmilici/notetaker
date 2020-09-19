const noteData = require("../db/db.json");
const fs = require("fs");
const path = require("path");
const { RSA_NO_PADDING } = require("constants");

module.exports = function(app) {
    app.get("/api/notes", function(req, res) {
        res.json(noteData);
    });

    var id = 0;

    app.post("/api/notes", function(req, res) {
        req.body.id = ++id;
        noteData.push(req.body);
        console.log(noteData);
        res.json(noteData);
        fs.writeFileSync(
            path.join(__dirname, "../db/db.json"),
            JSON.stringify(noteData),
            function(err) {
                if (err) throw err;
                console.log("Updated!");
            }
        );
    });

    app.delete("/api/notes/:id", function(req, res) {
        //get the is number from the button selected
        let selectedID = req.params.id;
        //determine what index in the existing array ties to the button selected ID
        let index = noteData.findIndex((data) => data.id == selectedID);
        //remove that object from the array based off the index determined above
        noteData.splice(index, 1);
        //not sure why we need this, but the script doesn't work without it
        res.json({ ok: true });

        fs.writeFileSync(
            path.join(__dirname, "../db/db.json"),
            JSON.stringify(noteData),
            function(err) {
                if (err) throw err;
                console.log("Updated!");
            }
        );
    });
};