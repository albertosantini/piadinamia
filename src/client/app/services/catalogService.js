"use strict";

(function () {
    angular
        .module("piadinamia")
        .factory("catalogService", catalogService);

    catalogService.$inject = ["$q"];

    function catalogService($q) {
        var service = {
            load: load,
            search: search,
            onSelect: onSelect
        };

        return service;

        function getMaster(query) {
            var master = firebase.database().ref("master"),
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

        function load(id, callback) {
            var catsRef = firebase.database().ref("/users/" + id + "/catalogs"),
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

            catsRef.once("value").then(function (snapshot) {
                var cats = snapshot.val();

                if (cats.$value === "" || cats.$value === null) {
                    cats.default = defaultCatName;
                    cats.piadinamia = defaultCat;

                    cats.set().then(function () {
                        callback(defaultCat, "piadinamia");
                    });
                } else {
                    callback(cats[cats.default.name],
                        cats.default.name);
                }
            });
        }

        function search(query) {
            return getMaster(query).then(function (catalogs) {
                var cats = [];

                angular.forEach(catalogs, function (userId, description) {
                    cats.push(description);
                });

                return cats;
            });
        }

        function onSelect($item, $model, $label) {
            console.log($item, $model, $label);
        }

    }

}());
