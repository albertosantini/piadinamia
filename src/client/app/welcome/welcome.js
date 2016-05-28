"use strict";

(function () {
    angular
        .module("piadinamia")
        .component("welcome", {
            controller: Welcome,
            templateUrl: "app/welcome/welcome.html"
        });

    Welcome.$inject = ["$timeout", "sessionService", "userService"];
    function Welcome($timeout, sessionService, userService) {
        var vm = this;

        vm.info = userService.info;

        sessionService.isLogged().then(function (userId) {
            var userRef = firebase.database().ref("/users/" + userId + "/name");
            userRef.once("value").then(function (snapshot) {
                $timeout(function () {
                    userService.info.name = snapshot.val();
                });
            });
        });
    }
}());
