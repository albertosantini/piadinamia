"use strict";

var path = require("path");

var express = require("express"),
    favicon = require("static-favicon");

var app = express(),
    port = 8000,
    pubdir = path.join(__dirname, "/app");

app.use(express.static(pubdir));
app.use(favicon(__dirname + pubdir + "/favicon.ico"));

app.listen(port, function () {
    console.log("piadinamia listening on port %s", port);
    console.log("static folder %s", pubdir);
});
