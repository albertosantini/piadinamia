"use strict";

angular.module("piadinamia").factory("sharedCartService",
    ["$firebase", "Firebase", "FBURL",
    function ($firebase, Firebase, FBURL) {
        var mySubscribers = [],
            cartByUser = {},
            cartByItem = {};

        function calcCartByUser(user, cart) {
            var myCart = [],
                total = 0;

            angular.forEach(cart, function (item) {
                myCart.push(item);
                total += item.qty * item.price;
            });

            cartByUser[user.id] = {
                name: user.name,
                total: total,
                cart: myCart
            };
        }

        function calcCartByItem() {
            cartByItem = {};

            angular.forEach(cartByUser, function (user) {
                user.cart.forEach(function (item) {
                    var counter = 0;

                    if (cartByItem[item.item]) {
                        counter = cartByItem[item.item].total + item.qty;
                    } else {
                        counter = item.qty;
                    }

                    cartByItem[item.item] = {
                        total: counter
                    };
                });
            });
        }

        function subscribeCarts(catalogName) {
            mySubscribers.forEach(function (user) {
                var ref = new Firebase(FBURL + "/users/" + user.id +
                            "/catalogs/" + catalogName + "/cart"),
                    cartSync = $firebase(ref).$asArray();

                cartSync.$watch(function () {
                    cartSync.$loaded().then(function () {
                        calcCartByUser(user, cartSync);
                        calcCartByItem();
                    });
                });
            });
        }

        return {
            init: function (userId, catalogName) {
                var ref = new Firebase(FBURL + "/users/" + userId +
                            "/catalogs/" + catalogName + "/subscribers"),
                    subscribersSync = $firebase(ref).$asArray();

                mySubscribers = subscribersSync;

                subscribersSync.$loaded().then(function () {
                    mySubscribers = subscribersSync;
                    subscribeCarts(catalogName);
                });
            },

            getCartByItem: function () {
                return cartByItem;
            },

            getCartByUser: function () {
                return cartByUser;
            }

        };

    }]);
