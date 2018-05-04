"use strict";

(function() {
    angular
        .module("piadinamia")
        .component("header", {
            controller: Header,
            templateUrl: "app/header/header.html"
        });

    Header.$inject = ["userService", "sessionService"];
    function Header(userService, sessionService) {
        const vm = this;

        vm.signup = signup;
        vm.signin = signin;
        vm.logout = logout;
        vm.isLogged = false;
        vm.info = userService.info;

        sessionService.isLogged().then(() => {
            vm.isLogged = true;
            vm.name = userService.info.name;
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
