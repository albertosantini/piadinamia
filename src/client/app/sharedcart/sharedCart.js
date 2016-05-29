"use strict";

(function () {
    angular
        .module("piadinamia")
        .component("sharedcart", {
            controller: SharedCart,
            templateUrl: "app/sharedcart/sharedCart.html"
        });

    SharedCart.$inject = ["sharedCartService"];

    function SharedCart(sharedCartService) {
        var vm = this;

        vm.sharedCart = sharedCartService;
    }

}());
