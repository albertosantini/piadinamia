"use strict";

(function() {
    angular
        .module("piadinamia")
        .component("welcome", {
            controller: Welcome,
            templateUrl: "app/welcome/welcome.html"
        });

    Welcome.$inject = ["$timeout", "sessionService", "userService"];
    function Welcome($timeout, sessionService, userService) {
        const vm = this;

        vm.info = userService.info;

        sessionService.isLogged().then(userId => {
            const userRef = firebase.database().ref(`/users/${userId}/name`);

            userRef.once("value").then(snapshot => {
                $timeout(() => {
                    userService.info.name = snapshot.val();
                });
            });
        });
    }
}());
