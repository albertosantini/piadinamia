"use strict";

(function () {
    angular
        .module("piadinamia")
        .component("signup", {
            controller: SignUp,
            templateUrl: "app/signup/signup.html"
        });

    SignUp.$inject = [];
    function SignUp() {
    }
}());
