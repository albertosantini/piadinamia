"use strict";

(function () {
    angular
        .module("piadinamia")
        .component("header", {
            controller: Header,
            templateUrl: "app/header/header.html"
        });

    Header.$inject = ["userService"];
    function Header(userService) {
        var vm = this;

        vm.home = home;
        vm.signup = signup;
        vm.signin = signin;
        vm.logout = logout;
        vm.user = userService;

        function home() {
            userService.home();
        }

        function signup() {
            userService.signup();
        }

        function signin() {
            userService.signin();
        }

        function logout() {
            userService.logout();
        }
    }
}());
