"use strict";

(function () {
    angular
        .module("piadinamia")
        .component("cart", {
            controller: Cart,
            templateUrl: "app/cart/cart.html"
        });

    Cart.$inject = ["cartService"];

    function Cart(cartService) {
        var vm = this;

        vm.cart = cartService;
    }

}());
