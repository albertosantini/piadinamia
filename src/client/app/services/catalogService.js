"use strict";

(function() {
    angular
        .module("piadinamia")
        .factory("catalogService", catalogService);

    catalogService.$inject = ["$timeout", "$q", "sessionService"];

    function catalogService($timeout, $q, sessionService) {
        const catalog = {},
            catsList = [],
            service = {
                getCatalog,
                getMyCatalogs,
                addItem,
                removeItem,
                addCatalog,
                removeCatalog,
                selectCatalog
            };

        let myId,
            catNameRef,
            catsRef;

        sessionService.isLogged().then(activate);

        return service;

        function activate(id) {
            const defaultCat = {
                name: "piadinamia",
                description: "Piadina Mia",
                items: {
                    "Piadina crudo": 4.00,
                    "Piadina farcita": 4.80,
                    "Piadina con nutella": 3.00,
                    "Piadina integrale crudo": 4.80,
                    "Acqua naturale": 1.50,
                    "Acqua frizzante": 2.00,
                    Bibita: 2.50
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
                        id
                    }

                ]
            };

            myId = id;

            catNameRef = firebase.database().ref(`/users/${myId}/catalog`);
            catsRef = firebase.database().ref(`/users/${myId}/catalogs`);

            catsRef.on("value", snapshot => {
                let cats = snapshot.val();

                if (!cats) {
                    cats = {};
                    cats.piadinamia = defaultCat;

                    catsRef.set(cats).then(() => {
                        $timeout(() => {
                            angular.extend(catalog, defaultCat);
                        });
                    });
                } else {
                    angular.extend(catsList, Object.keys(cats));

                    catNameRef.on("value", snapshotCatName => {
                        const catName = snapshotCatName.val();

                        $timeout(() => {
                            if (Object.prototype.hasOwnProperty.call(cats, catName)) {
                                if (!Object.prototype.hasOwnProperty.call(cats[catName], "items")) {
                                    cats[catName].items = {};
                                }

                                angular.extend(catalog, cats[catName]);
                            }
                        });
                    });
                }

            });
        }

        function getCatalog() {
            return catalog;
        }

        function getMyCatalogs() {
            return catsList;
        }

        function addItem(price, item) {
            const itemsRef = catsRef.child(`${catalog.name}/items`),
                newItem = {};

            newItem[item] = price;
            angular.merge(catalog.items, newItem);
            itemsRef.set(catalog.items);
        }

        function removeItem(item) {
            const itemRef = catsRef.child(`${catalog.name}/items/${item}`);

            itemRef.remove();
            delete catalog.items[item];
        }

        function addCatalog(name, desc) {
            add(name, desc);
        }

        function removeCatalog(name) {
            let index;

            if (name && catsList.length > 1) {
                index = catsList.indexOf(name);
                catsList.splice(index, 1);
                catsRef.child(name).remove();
                catNameRef.set(catsList[0]);
            }
        }

        function selectCatalog(name) {
            if (name) {
                catNameRef.set(name);
            }
        }

        function add(name, desc) {
            const cats = {};

            cats[name] = {
                cart: {},
                description: desc,
                items: {},
                name,
                subscribers: {
                    0: {
                        id: myId
                    }
                }
            };

            catsList.push(name);

            catsRef.update(cats).then(() => {
                catNameRef.set(name);

                $timeout(() => {
                    angular.extend(catalog, cats[name]);
                });
            });


        }

    }

}());
