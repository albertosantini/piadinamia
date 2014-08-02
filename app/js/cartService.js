"use strict";

angular.module("piadinamia").factory("cartService",
    ["$firebase", "Firebase", "FBURL",
    function ($firebase, Firebase, FBURL) {
        var myCart = [];

        return {
            init: function (userId, catalogName) {
                var ref = new Firebase(FBURL + "/users/" + userId +
                            "/catalogs/" + catalogName + "/cart"),
                    cartSync = $firebase(ref).$asArray();

                myCart = cartSync;

                cartSync.$loaded().then(function () {
                    myCart = cartSync;
                });
            },

            getItems: function () {
                return myCart;
            },

            saveItem: function (index) {
                myCart.$save(index);
            },

            getTotalCount: function () {
                var total = 0;

                myCart.forEach(function (item) {
                    total += item.qty;
                });

                return total;
            },

            getTotalPrice: function () {
                var total = 0;

                myCart.forEach(function (item) {
                    total += item.price * item.qty;
                });

                return total;
            },

            addItem: function (item, price, qty) {
                var self = this,
                    found = false;

                qty = qty || 1;

                myCart.every(function (el, index) {
                    var cart = myCart[index];

                    if (el.item === item) {
                        found = true;

                        cart.qty += qty;

                        if (cart.qty === 0) {
                            self.clearItem(index);
                        } else {
                            cart.total = cart.price * cart.qty;
                            self.saveItem(index);
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
            },

            clearItem: function (index) {
                myCart.$remove(index);
            }
        };

    }]);
