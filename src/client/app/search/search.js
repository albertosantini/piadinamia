"use strict";

(function () {
    angular
        .module("piadinamia")
        .component("search", {
            controller: Search,
            templateUrl: "app/search/search.html"
        });

    Search.$inject = ["$q"];

    function Search($q) {
        var vm = this;

        vm.search = search;
        vm.onSelect = onSelect;

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
