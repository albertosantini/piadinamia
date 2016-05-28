"use strict";

(function () {
    angular
        .module("piadinamia")
        .component("jumbo", {
            controller: Jumbo,
            templateUrl: "app/jumbo/jumbo.html"
        });

    Jumbo.$inject = ["sessionService", "userService"];
    function Jumbo(sessionService, userService) {
        var vm = this;

        vm.user = userService;
        vm.signup = signup;
        vm.isLogged = false;

        sessionService.isLogged().then(function () {
            vm.isLogged = true;
        });

        function signup() {
            userService.signup();
        }
    }
}());
