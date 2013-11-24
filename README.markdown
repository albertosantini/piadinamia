PIADINAMIA
======

Piadinamia is an shopping cart app.

It is a good candidate app for AngularJS and Firebase.
Read [AngularJS Tutorial: Learn to Rapidly Build Real-time Web Apps with Firebase](http://www.thinkster.io/pick/eHPCs7s87O/angularjs-tutorial-learn-to-rapidly-build-real-time-web-apps-with-firebase)

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
