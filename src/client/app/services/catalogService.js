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

            catsRef.once("value").then(function (snapshot) {
                var cats = snapshot.val(),
                    catalog;

                if (cats.$value === "" || cats.$value === null) {
                    cats.default = defaultCatName;
                    cats.piadinamia = defaultCat;

                    cats.set().then(function () {
                        catalog = defaultCat;
                    });
                } else {
                    catalog = cats[cats.default.name];
                }

                $timeout(function () {
                    angular.extend(service.catalog, catalog);
                });
            });
        }

    }

}());
