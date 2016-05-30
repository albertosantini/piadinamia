"use strict";

(function () {
    angular
        .module("piadinamia")
        .component("header", {
            controller: Header,
            templateUrl: "app/header/header.html"
        });

    Header.$inject = ["userService", "sessionService"];
    function Header(userService, sessionService) {
        var vm = this;

        vm.signup = signup;
        vm.signin = signin;
        vm.logout = logout;
        vm.name = userService.info.name;
        vm.isLogged = false;

        sessionService.isLogged().then(function () {
            vm.isLogged = true;
        });

        function signup() {
            userService.signup();
        }

        function signin() {
            userService.signin();
        }

        function logout() {
            userService.logout();
            window.location = "/";
        }
    }
}());
