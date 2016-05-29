"use strict";

(function () {
    angular
        .module("piadinamia")
        .component("catalog", {
            controller: Catalog,
            templateUrl: "app/catalog/catalog.html"
        });

    Catalog.$inject = ["catalogService", "cartService"];

    function Catalog(catalogService, cartService) {
        var vm = this;

        vm.catalog = catalogService.catalog;
        vm.cart = cartService;
    }

}());
