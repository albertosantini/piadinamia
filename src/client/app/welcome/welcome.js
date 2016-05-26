"use strict";

(function () {
    angular
        .module("piadinamia")
        .component("welcome", {
            controller: Welcome,
            templateUrl: "app/welcome/welcome.html"
        });

    Welcome.$inject = ["userService"];
    function Welcome(userService) {
        var vm = this;

        vm.user = userService;
    }
}());
