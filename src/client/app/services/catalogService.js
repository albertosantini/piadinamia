"use strict";

(function () {
    angular
        .module("piadinamia")
        .factory("catalogService", catalogService);

    catalogService.$inject = ["$timeout", "$q", "sessionService"];

    function catalogService($timeout, $q, sessionService) {
        var myId,
            catalog = {},
            catNameRef,
            catsRef,
            service = {
                getCatalog: getCatalog,
                addItem: addItem,
                removeItem: removeItem,
                addCatalog: addCatalog,
                removeCatalog: removeCatalog
            };

        sessionService.isLogged().then(activate);

        return service;

        function activate(id) {
            var defaultCat = {
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

            myId = id;

            catNameRef = firebase.database().ref("/users/" + myId + "/catalog");
            catsRef = firebase.database().ref("/users/" + myId + "/catalogs");

            catsRef.on("value", function (snapshot) {
                var cats = snapshot.val();

                if (!cats) {
                    cats = {};
                    cats.piadinamia = defaultCat;

                    catsRef.set(cats).then(function () {
                        $timeout(function () {
                            angular.extend(catalog, defaultCat);
                        });
                    });
                } else {
                    catNameRef.on("value", function (snapshotCatName) {
                        var catName = snapshotCatName.val();

                        $timeout(function () {
                            angular.extend(catalog, cats[catName]);
                        });
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

        function addCatalog(name, desc) {
            add(name, desc);
        }

        function removeCatalog() {
            console.log("removeCatalog", catalog.name, "to be implemented");
        }

        function add(name, desc) {
            var cats = {};

            cats[name] = {
                cart: {},
                description: desc,
                items: {},
                name: name,
                private: false,
                subscribers: {
                    0: {
                        id: myId
                    }
                }
            };

            catsRef.update(cats).then(function () {
                catNameRef.set(name);

                $timeout(function () {
                    angular.extend(catalog, cats[name]);
                });
            });


        }

    }

}());
