(function () {
    "use strict";

    var app = angular.module("piadinamia", [
        "firebase",
        "ui.bootstrap",
        "ngRoute"
    ]);

    app.constant("FBURL", "https://piadinamia.firebaseio.com/");

    app.config(
        ["$routeProvider", "$locationProvider",
        function ($routeProvider, $locationProvider) {
            $routeProvider
                .when("/", {templateUrl: "views/default.html"})
                .when("/signin", {templateUrl: "views/users/signin.html"})
                .when("/signup", {templateUrl: "views/users/signup.html"})
                .otherwise({redirectTo: "/"});
            $locationProvider.html5Mode(true);
    }]);

    app.run(["sessionService", "$rootScope", "FBURL",
        function (sessionService, $rootScope, FBURL) {
            $rootScope.auth = sessionService.init("/signin");
            $rootScope.FBURL = FBURL;
        }]);
}());
