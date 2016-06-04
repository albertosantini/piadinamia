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

        vm.catalog = catalogService.getCatalog();
        vm.cart = cartService;
        vm.isEditMode = false;
        vm.editMode = editMode;
        vm.addItem = addItem;
        vm.removeItem = removeItem;

        function editMode() {
            vm.isEditMode = !vm.isEditMode;
        }

        function addItem(price, item) {
            price = filterFloat(price);

            if (price && !isNaN(price) && item) {
                catalogService.addItem(price, item);
            }
        }

        function removeItem(item) {
            if (item) {
                catalogService.removeItem(item);
            }
        }

        function filterFloat(value) {
            if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value)) {
                return Number(value);
            }

            return NaN;
        }
    }

}());
