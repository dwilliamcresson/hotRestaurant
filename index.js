var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
//var reservationsData = require(__dirname, "reservationsData");
//var waitlistData = require(__dirname, "waitlistData");

var app = express();
//var PORT = 8889;
var PORT = process.env.PORT || 8889;


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// RESERVATION DATA FORM

var reservationsData = [{
    resName: "elenawasnak",
    name: "Elena Wasnak",
    time: "8.00PM",
    date: "11/15/2018",
    phone: "555-867-5309",
    email: "no@no.no"
}];

var waitlist = [{
    resName: "elenawasnak",
    name: "Elena Wasnak",
    time: "8.00PM",
    date: "11/15/2018",
    phone: "555-867-5309",
    email: "no@no.no"
}];

app.get("/api/:reservations?", function (req, res) {
    var chosen = req.params.reservationsData;

    if (chosen) {
        console.log(chosen);

        for (var i = 0; i < reservationsData.length; i++) {
            if (chosen === reservationsData[i].routeName) {
                return res.json(reservationsData[i]);
            }
        }
        return res.send("No reservations Found");
    }
    return res.json(reservationsData);
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