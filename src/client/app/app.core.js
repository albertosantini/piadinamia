"use strict";

(function () {
    angular
        .module("piadinamia")
        .config(configBlock);

    configBlock.$inject = ["$locationProvider"];

    function configBlock($locationProvider) {
        $locationProvider.html5Mode(true);
    }

    var config = {
        apiKey: "AIzaSyBzOgkw0K2z_hUPZLRpvpTP0jEI-x2Y4A0",
        authDomain: "piadinamia.firebaseapp.com",
        databaseURL: "https://piadinamia.firebaseio.com",
        storageBucket: ""
    };
    firebase.initializeApp(config);
}());
