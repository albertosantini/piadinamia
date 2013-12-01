"use strict";

var express = require("express");

var app = express(),
    port = 8000,
    pubdir = __dirname + "/app";

app.configure(function () {
    app.use(express.static(pubdir));
    app.use(express.favicon(__dirname + pubdir + "/favicon.ico"));
    app.use(express.errorHandler());
});

app.listen(port, function () {
    console.log("piadinamia listening on port %s on folder %s",
        this.address().port, pubdir);
});
