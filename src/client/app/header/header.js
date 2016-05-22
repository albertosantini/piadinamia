"use strict";

(function () {
    angular
        .module("piadinamia")
        .component("header", {
            controller: Header,
            templateUrl: "app/header/header.html"
        });

    Header.$inject = [];
    function Header() {
    }
}());
