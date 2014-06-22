"use strict";

var path = require("path"),
    express = require("express");

var app = express(),
    port = 8000,
    pubdir = path.join(__dirname, "/app");

app.use(express.static(pubdir));

app.listen(port, function () {
    console.log("piadinamia listening on port %s", port);
    console.log("static folder %s", pubdir);
});
