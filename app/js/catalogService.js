"use strict";

angular.module("piadinamia").factory("catalogService",
    ["$firebase", "Firebase", "FBURL", "$q",
    function ($firebase, Firebase, FBURL, $q) {

        function getMaster(query) {
            var master = new Firebase(FBURL + "/master"),
                deferred = $q.defer();

            master
                .startAt(null, query)
                .endAt(null, query + "z")
                .once("value", function (snapshot) {
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
                var ref = new Firebase(FBURL + "/users/" + id + "/catalogs"),
                    catsSync = $firebase(ref).$asObject(),
                    defaultCatName = {
                        name: "piadinamia"
                    },
                    defaultCat = {
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
                    };

                catsSync.$loaded().then(function () {
                    if (catsSync.$value === "" || catsSync.$value === null) {
                        catsSync.default = defaultCatName;
                        catsSync.piadinamia = defaultCat;

                        catsSync.$save().then(function () {
                            callback(defaultCat, "piadinamia");
                        });
                    } else {
                        callback(catsSync[catsSync.default.name],
                            catsSync.default.name);
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
            },

            onSelect: function ($item, $model, $label) {
                console.log($item, $model, $label);
            }

        };
    }]);
