"use strict";

(function () {
    angular
        .module("piadinamia")
        .component("default", {
            controller: Default,
            templateUrl: "app/layout/default.html"
        });

    Default.$inject = [];
    function Default() {
    }
}());
