"use strict";

(function () {
    angular
        .module("piadinamia")
        .component("jumbo", {
            controller: Jumbo,
            templateUrl: "app/jumbo/jumbo.html"
        });

    Jumbo.$inject = ["userService"];
    function Jumbo(userService) {
        var vm = this;

        vm.user = userService;
        vm.signup = signup;

        function signup() {
            userService.signup();
        }
    }
}());
