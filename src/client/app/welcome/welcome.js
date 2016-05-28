"use strict";

(function () {
    angular
        .module("piadinamia")
        .component("welcome", {
            controller: Welcome,
            templateUrl: "app/welcome/welcome.html"
        });

    Welcome.$inject = ["$scope", "sessionService", "userService"];
    function Welcome($scope, sessionService, userService) {
        var vm = this;

        vm.name = "";

        sessionService.isLogged().then(function (userId) {
            var userRef = firebase.database().ref("/users/" + userId);
            userRef.once("value").then(function (snapshot) {
                vm.name = snapshot.val().name;
                userService.info.name = vm.name;

                $scope.$apply();
            });
        });
    }
}());
