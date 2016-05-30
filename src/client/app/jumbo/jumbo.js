"use strict";

(function () {
    angular
        .module("piadinamia")
        .component("jumbo", {
            controller: Jumbo,
            templateUrl: "app/jumbo/jumbo.html"
        });

    Jumbo.$inject = ["$location", "sessionService"];
    function Jumbo($location, sessionService) {

        sessionService.isLogged().then(function () {
            $location.path( "/home" );
        });
    }
}());
