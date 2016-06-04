"use strict";

(function () {
    angular
        .module("piadinamia")
        .factory("catalogService", catalogService);

    catalogService.$inject = ["$timeout", "$q", "sessionService"];

    function catalogService($timeout, $q, sessionService) {
        var catalog = {},
            catsRef,
            service = {
                getCatalog: getCatalog,
                addItem: addItem,
                removeItem: removeItem
            };

        sessionService.isLogged().then(activate);

        return service;

        function activate(id) {
            var defaultCatName = {
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

            catsRef = firebase.database().ref("/users/" + id + "/catalogs");

            catsRef.on("value", function (snapshot) {
                var cats = snapshot.val();

                if (!cats) {
                    cats = {};
                    cats.default = defaultCatName;
                    cats.piadinamia = defaultCat;

                    catsRef.set(cats).then(function () {
                        $timeout(function () {
                            angular.extend(catalog, defaultCat);
                        });
                    });
                } else {
                    $timeout(function () {
                        angular.extend(catalog, cats[cats.default.name]);
                    });
                }

            });
        }

        function getCatalog() {
            return catalog;
        }

        function addItem(price, item) {
            var itemsRef = catsRef.child(catalog.name + "/items"),
                newItem = {};

            newItem[item] = price;
            angular.merge(catalog.items, newItem);
            itemsRef.set(catalog.items);
        }

        function removeItem(item) {
            var itemRef = catsRef.child(catalog.name + "/items/" + item);

            itemRef.remove();
            delete catalog.items[item];
        }

    }

}());
