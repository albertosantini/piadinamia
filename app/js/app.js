(function () {
    "use strict";

    var app = angular.module("piadinamia", [
            "firebase",
            "ui.bootstrap",
            "ngRoute"
        ]);

    app.constant("FBURL", "https://piadinamia.firebaseio.com/");

    app.config(["$routeProvider", function ($routeProvider) {
        $routeProvider
        .when("/", { templateUrl: "views/default.html" })
        .when("/signin", { templateUrl: "views/users/signin.html" })
        .when("/signup", { templateUrl: "views/users/signup.html" })
        .otherwise({ redirectTo: "/" });
    }]);

    app.run(["angularFireAuth", "FBURL", "$rootScope",
        function (angularFireAuth, FBURL, $rootScope) {
        angularFireAuth.initialize(new Firebase(FBURL), {
            scope: $rootScope,
            name: "auth",
            path: "/signin"
        });
        $rootScope.FBURL = FBURL;
    }]);
}());
