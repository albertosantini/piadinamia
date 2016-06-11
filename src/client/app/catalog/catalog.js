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

        vm.isNewMode = false;
        vm.newMode = newMode;
        vm.addCatalog = addCatalog;
        vm.removeCatalog = removeCatalog;

        vm.isListMode = false;
        vm.selectMode = selectMode;
        vm.myCatalogs = catalogService.getMyCatalogs();
        vm.selectCatalog = selectCatalog;


        function editMode() {
            vm.isListMode = false;
            vm.isNewMode = false;
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

        function newMode() {
            vm.isListMode = false;
            vm.isEditMode = false;
            vm.isNewMode = !vm.isNewMode;
        }

        function addCatalog(name, desc) {
            if (name && desc) {
                catalogService.addCatalog(name, desc);
                vm.isListMode = false;
                vm.isNewMode = false;
                vm.isEditMode = true;
            }
        }

        function removeCatalog() {
            catalogService.removeCatalog(vm.catalog.name);
            vm.isNewMode = false;
            vm.isEditMode = false;
            vm.isListmove = false;
        }

        function selectMode() {
            vm.isNewMode = false;
            vm.isEditMode = false;
            vm.isListMode = !vm.isListMode;
        }

        function selectCatalog(name) {
            catalogService.selectCatalog(name);
        }

        function filterFloat(value) {
            if (/^(\-|\+)?([0-9]+(\.[0-9]+)?|Infinity)$/.test(value)) {
                return Number(value);
            }

            return NaN;
        }

    }

}());
