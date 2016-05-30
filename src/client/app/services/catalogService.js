"use strict";

(function () {
    angular
        .module("piadinamia")
        .factory("catalogService", catalogService);

    catalogService.$inject = ["$timeout", "$q", "sessionService"];

    function catalogService($timeout, $q, sessionService) {
        var service = {
            catalog: {}
        };

        sessionService.isLogged().then(activate);

        return service;

        function activate(id) {
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

            catsRef.on("value", function (snapshot) {
                var cats = snapshot.val(),
                    catalog;

                if (!cats) {
                    cats = {};
                    cats.default = defaultCatName;
                    cats.piadinamia = defaultCat;

                    catsRef.set(cats).then(function () {
                        catalog = defaultCat;
                        $timeout(function () {
                            angular.extend(service.catalog, catalog);
                        });
                    });
                } else {
                    catalog = cats[cats.default.name];
                    $timeout(function () {
                        angular.extend(service.catalog, catalog);
                    });
                }

            });
        }

    }

}());
