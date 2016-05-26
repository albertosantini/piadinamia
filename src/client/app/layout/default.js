"use strict";

(function () {
    angular
        .module("piadinamia")
        .component("default", {
            controller: Default,
            templateUrl: "app/layout/default.html"
        });

    Default.$inject = [
        "$scope",
        "userService",
        "catalogService",
        "cartService",
        "sharedCartService"
    ];
    function Default($scope, userService, catalogService,
            cartService, sharedCartService) {
        var vm = this,
            authRef = firebase.auth();

        vm.user = userService;

        authRef.onAuthStateChanged(function (authData) {
            var userId,
                userRef;

            if (!authData) {
                return;
            }

            userService.home();

            userId = authData.uid.split(":")[1];
            userRef = firebase.database().ref("/users/" + userId);
            userRef.once("value").then(function (snapshot) {
                vm.user.info.name = snapshot.val().name;
                $scope.$apply();
            });

            catalogService.load(userId, function (catalog, catalogName) {
                vm.catalog = catalog;

                cartService.init(userId, catalogName);
                vm.cart = cartService;

                sharedCartService.init(userId, catalogName);
                vm.sharedCart = sharedCartService;

                vm.master = catalogService;
            });
        });
    }
}());
