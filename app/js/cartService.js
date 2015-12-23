"use strict";

(function () {
    angular
        .module("piadinamia")
        .factory("cartService", cartService);

    cartService.$inject = ["$firebaseArray", "Firebase", "FBURL"];

    function cartService($firebaseArray, Firebase, FBURL) {
        var myCart = [],
            service = {
                init: init,
                getItems: getItems,
                saveItem: saveItem,
                getTotalCount: getTotalCount,
                getTotalPrice: getTotalPrice,
                addItem: addItem,
                clearItem: clearItem
            };

        return service;

        function init(userId, catalogName) {
            var ref = new Firebase(FBURL + "/users/" + userId +
                        "/catalogs/" + catalogName + "/cart"),
                cartSync = $firebaseArray(ref);

            myCart = cartSync;

            cartSync.$loaded().then(function () {
                myCart = cartSync;
            });
        }

        function getItems() {
            return myCart;
        }

        function saveItem(index) {
            myCart.$save(index);
        }

        function getTotalCount() {
            var total = 0;

            myCart.forEach(function (item) {
                total += item.qty;
            });

            return total;
        }

        function getTotalPrice() {
            var total = 0;

            myCart.forEach(function (item) {
                total += item.price * item.qty;
            });

            return total;
        }

        function addItem(item, price, qty) {
            var found = false;

            qty = qty || 1;

            myCart.every(function (el, index) {
                var cart = myCart[index];

                if (el.item === item) {
                    found = true;

                    cart.qty += qty;

                    if (cart.qty === 0) {
                        service.clearItem(index);
                    } else {
                        cart.total = cart.price * cart.qty;
                        service.saveItem(index);
                    }

                    return false;
                }

                return true;
            });

            if (!found) {
                myCart.$add({
                    item: item,
                    price: price,
                    qty: 1,
                    total: price
                });
            }
        }

        function clearItem(index) {
            myCart.$remove(index);
        }
    }

}());
