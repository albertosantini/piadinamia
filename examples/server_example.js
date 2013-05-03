"use strict";

var piadinamia = require("piadinamia");

var config = {
    port: process.env.app_port || 21132,
    pubdir: "/public/piadinamia",
    crm: {
        liveDomain: "x.y.z",
        liveUrl: "http://user1:pass1" +
            "@a.b.c",
        liveDb: "piadinamia",
        testingUrl: "http://user2:pass2" +
            "@a.b.c",
        testingDb: "piadinamia-staging",
        design: "piadinamia"
    }
};

piadinamia.startApp(config);
