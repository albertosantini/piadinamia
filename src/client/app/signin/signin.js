"use strict";

(function() {
    angular
        .module("piadinamia")
        .component("signin", {
            controller: SignIn,
            templateUrl: "app/signin/signin.html"
        });

    SignIn.$inject = ["userService"];
    function SignIn(userService) {
        const vm = this;

        vm.user = userService;
    }
}());
