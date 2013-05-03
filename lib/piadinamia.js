"use strict";

var os = require("os"),
    request = require("request"),
    express = require("express");

function isLiveInstance(cfg) {
    var hostname = os.hostname(),
        isLive = false;

    if (hostname.search(cfg.liveDomain) >= 0) {
        isLive = true;
    }

    return isLive;
}

function getCouchDBInstance(cfg) {
    var isLive, couchURL, couchDB, couchDesign;

    isLive = isLiveInstance(cfg);

    couchURL = isLive ? cfg.liveUrl : cfg.testingUrl;
    couchDB =  isLive ? couchURL + cfg.liveDb : couchURL + cfg.testingDb;
    couchDesign = "/_design/" + cfg.design;

    return {
        couchURL: couchURL,
        couchDB: couchDB,
        couchDesign: couchDesign
    };
}

// map and reduce functions
//
// function (doc) {
//     emit([doc.ourTag, doc.myTag, Date.parse(doc.created_at)], {
//         myTag: doc.myTag,
//         created_at: doc.created_at,
//         items: doc.items
//     });
// }
//
// function (keys, values, rereduce) {
//     var values_sorted = values.sort(function(a, b) {
//         var d1 = new Date(a.created_at),
//             d2 = new Date(b.created_at);
//         return (d1 > d2);
//     });
//
//     return values_sorted[values_sorted.length - 1];
// }

function getView(couch, name, options, callback) {
    var view = couch.couchDesign + "/_view/" + name,
        opt,
        opts = "?",
        uri;

    for (opt in options) {
        if (options.hasOwnProperty(opt)) {
            opts += opt + "=" + options[opt] + "&";
        }
    }

    uri = couch.couchDB + view + opts,
    // console.log(uri);
    request({
        method: "GET",
        uri: uri,
        json: true
    }, function (error, response, data) {
        callback(error, data);
    });
}

function getCartsByGroup(couch, group, callback) {
    getView(couch, "byGroup", {
        group_level: 2,
        reduce: true,
        startkey: "[\"" + group + "\", 0]",
        endkey: "[\"" + group + "\", {}]"
    }, callback);
}


function startApp(config) {
    var app = express(),
        cfg = config || {},
        port = cfg.port || 8081,
        pubdir = __dirname + cfg.pubdir || __dirname + "/public/piadinamia";

    app.configure(function () {
        app.use(express.static(pubdir));
        app.use(express.favicon(__dirname + pubdir + "/favicon.ico"));
        app.use(express.bodyParser());
        app.use(express.errorHandler());
    });

    app.listen(port, function () {
        console.log("piadinamia listening on port %s on folder %s",
            this.address().port, pubdir);
    });

    app.post("/carts", function (req, res) {
        var couch = getCouchDBInstance(cfg.crm);

        request({
            method: "POST",
            uri: couch.couchDB + "/",
            json: req.body
        }, function (err) {
            if (!err) {
                getCartsByGroup(couch, req.body.ourTag,
                    function (err, results) {
                        res.contentType("application/json");
                        res.send(results);
                    });
            }

        });

    });
}
exports.startApp = startApp;
