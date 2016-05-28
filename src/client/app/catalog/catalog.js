"use strict";

(function () {
    angular
        .module("piadinamia")
        .component("catalog", {
            controller: Catalog,
            templateUrl: "app/catalog/catalog.html"
        });

    Catalog.$inject = ["$scope", "$q", "sessionService"];

    function Catalog($scope, $q, sessionService) {
        var vm = this;

        vm.catalog = {};

        sessionService.isLogged().then(activate);

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
                var cats = snapshot.val();

                if (cats.$value === "" || cats.$value === null) {
                    cats.default = defaultCatName;
                    cats.piadinamia = defaultCat;

                    cats.set().then(function () {
                        angular.extend(vm.catalog, defaultCat);
                    });
                } else {
                    angular.extend(vm.catalog, cats[cats.default.name]);
                }

                $scope.$apply();
            });
        }

    }

}());
