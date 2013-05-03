PIADINAMIA
======

Piadinamia is an shopping cart app.

Example
========

    var piadinamia = require("piadinamia");

    var config = {
        port: 8081
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

Installation
============

To install with [npm](http://github.com/isaacs/npm):

    npm install piadinamia

Tested with node 0.10.x.
