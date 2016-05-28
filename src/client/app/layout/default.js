"use strict";

(function () {
    angular
        .module("piadinamia")
        .component("default", {
            templateUrl: "app/layout/default.html",
            controller: Default
        });

    Default.$inject = ["sessionService", "userService"];

    function Default(sessionService, userService) {
        var vm = this;

        vm.user = userService;

        sessionService.isLogged().then(function () {
            userService.home();
        });
    }

}());
