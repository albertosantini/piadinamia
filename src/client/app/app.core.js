"use strict";

(function () {
    angular
        .module("piadinamia")
        .config(config);

    config.$inject = ["$locationProvider", "$routeProvider"];
    function config($locationProvider, $routeProvider) {

        $routeProvider
           .when("/", {
               template: "<header></header><jumbo></jumbo>"
           })
           .when("/home", {
               template: "<header></header><default></default>"
           })
           .when("/signin", {
               template: "<header></header><signin></signin>"
           })
           .when("/signup", {
               template: "<header></header><signup></signup>"
           })
           .otherwise({
               redirectTo: "/"
           });

        $locationProvider.html5Mode(true);
    }

    firebase.initializeApp({
        apiKey: "AIzaSyBzOgkw0K2z_hUPZLRpvpTP0jEI-x2Y4A0",
        authDomain: "piadinamia.firebaseapp.com",
        databaseURL: "https://piadinamia.firebaseio.com",
        storageBucket: ""
    });
}());
