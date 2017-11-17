var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var reservationData = require(__dirname, "reservationsData");
var waitlistData = require(__dirname, "waitlistData");

var app = express();
//var PORT = 8889;
var PORT = process.env.PORT || 8889;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// RESERVATION DATA FORM

var reservations = [{
    resName: "elenawasnak",
    name: "Elena Wasnak",
    time: "8.00PM",
    date: "11/15/2018",
    phone: "555-867-5309",
    email: "no@no.no"
}];

app.get("/api/:reservations?", function (req, res) {
    var chosen = req.params.reservations;

    if (chosen) {
        console.log(chosen);

        for (var i = 0; i < reservations.length; i++) {
            if (chosen === reservations[i].routeName) {
                return res.json(reservations[i]);
            }
        }
        return res.send("No reservations Found");
    }
    return res.json(reservations);
});

app.post("/api/new", function(req, res) {
    var newReservation = req.body;
    newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();    
  
    console.log(newReservation);
  
    reservations.push(newReservation);
  
    res.json(newReservation);
  });

// LOAD HOMESCREEN/INDEX
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reservations", function (req, res) {
    res.sendFile(path.join(__dirname, "reservations.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

// LISTENER 
// =====================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});