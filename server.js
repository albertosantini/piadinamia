"use strict";

var util = require("util"),
    path = require("path"),
    express = require("express");

var app = express(),
    port = 8000,
    pubdir = path.join(__dirname, "/app");

app.use(express.static(pubdir));

app.listen(port, function () {
    util.log("piadinamia listening on http://localhost:%s", port);
    util.log("piadinamia static folder %s", pubdir);
});
