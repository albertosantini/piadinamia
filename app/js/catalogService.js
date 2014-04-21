"use strict";

angular.module("piadinamia").factory("catalogService",
    ["$firebase", "Firebase", "FBURL",
    function ($firebase, Firebase, FBURL) {

        return {
            load: function (id, callback) {
                var cats = new Firebase(FBURL + "/users/" + id + "/catalogs"),
                    defaultCat = {
                        default: {
                            name: "piadinamia"
                        },
                        piadinamia: {
                            name: "piadinamia",
                            description: "Piadina Mia",
                            private: false,
                            items: {
                                "Piadina crudo": 4.00,
                                "Piadina farcita": 4.80,
                                "Piadina con nutella": 3.00,
                                "Piadina integrale crudo": 4.80,
                                "Acqua naturale": 1.50,
                                "Acqua frizzante": 2.00,
                                "Bibita": 2.50
                            },
                            cart: [
                                {
                                    item: "Piadina crudo",
                                    price: 4.00,
                                    qty: 2.00,
                                    total: 8.00
                                }
                            ],
                            customers: [
                                {
                                    id: id
                                }
                            ]
                        }
                    };

                $firebase(cats)
                    .$on("loaded", function (snapshot) {
                        if (!snapshot) {
                            cats.set(defaultCat, function (err) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    callback(defaultCat.piadinamia,
                                        "piadinamia");
                                }
                            });
                        } else {
                            callback(snapshot[snapshot.default.name],
                                snapshot.default.name);
                        }
                    });
            }
        };
    }]);
