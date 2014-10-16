(function () {
    "use strict";

    angular
        .module("piadinamia", [
            "firebase",
            "ui.bootstrap",
            "ngRoute"
        ])
        .constant("FBURL", "https://piadinamia.firebaseio.com")
        .config(config);

    config.$inject = ["$routeProvider", "$locationProvider"];

    function config($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {templateUrl: "views/default.html"})
            .when("/signin", {templateUrl: "views/users/signin.html"})
            .when("/signup", {templateUrl: "views/users/signup.html"})
            .otherwise({redirectTo: "/"});

        $locationProvider.html5Mode(true);
    }

}());
