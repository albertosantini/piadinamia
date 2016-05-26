"use strict";

(function () {
    angular
        .module("piadinamia")
        .component("signin", {
            controller: SignIn,
            templateUrl: "app/signin/signin.html"
        });

    SignIn.$inject = ["userService"];
    function SignIn(userService) {
        var vm = this;

        vm.info = userService.info;
        vm.signin = signin;

        function signin() {
            userService.info.email = vm.info.email;
            userService.info.pass = vm.info.pass;
            userService.signin();
        }

    }
}());
