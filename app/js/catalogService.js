"use strict";

angular.module("piadinamia").factory("catalogService",
    ["$firebase", "Firebase", "FBURL", "$q",
    function ($firebase, Firebase, FBURL, $q) {

        function getMaster(query) {
            var master = new Firebase(FBURL + "/master"),
                masterQuery = master.startAt(null, query).limit(10),
                deferred = $q.defer();

            masterQuery.once("value", function (snapshot) {
                var val = snapshot.val();

                if (val) {
                    deferred.resolve(val);
                } else {
                    deferred.reject();
                }
            });

            return deferred.promise;
        }

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
                            subscribers: [
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
            },

            search: function (query) {
                return getMaster(query).then(function (catalogs) {
                    var cats = [];

                    angular.forEach(catalogs, function (userId, description) {
                        cats.push(description);
                    });

                    return cats;
                });
            }

        };
    }]);
