"use strict";

(function() {
    angular
        .module("piadinamia")
        .component("signup", {
            controller: SignUp,
            templateUrl: "app/signup/signup.html"
        });

    SignUp.$inject = ["userService"];
    function SignUp(userService) {
        const vm = this;

        vm.user = userService;
    }
}());
