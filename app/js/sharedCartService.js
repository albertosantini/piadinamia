"use strict";

angular.module("piadinamia").factory("sharedCartService",
    ["cartService", "$firebase", "Firebase", "FBURL",
    function (cartService, $firebase, Firebase, FBURL) {
        var mySubscribers = [],
            myCatalogName,
            cartByUser = {};

        return {
            init: function (subscribers, catalogName, userId) {
                var subscribersRef,
                    url = FBURL + "/users/" + userId +
                        "/catalogs/" + catalogName + "/subscribers";

                mySubscribers = subscribers;
                myCatalogName = catalogName;

                subscribersRef = new Firebase(url);

                $firebase(subscribersRef).$on("loaded", function (subs) {
                    mySubscribers = [];
                    angular.forEach(subs, function (item) {
                        mySubscribers.push(item);
                    });
                });

                $firebase(subscribersRef).$on("change", function () {
                    console.log("subscribers change");
                });

                mySubscribers.forEach(function (user) {
                    var cartRef,
                        url = FBURL + "/users/" + user.id +
                            "/catalogs/" + myCatalogName + "/cart";

                    cartRef = new Firebase(url);

                    $firebase(cartRef).$on("loaded", function (cart) {
                        var myCart = [];

                        angular.forEach(cart, function (item) {
                            myCart.push(item);
                        });

                        cartByUser[user.id] = {
                            name: user.name,
                            cart: myCart
                        };
                    });

                    $firebase(cartRef).$on("change", function () {
                        var cartRef,
                            url = FBURL + "/users/" + user.id +
                                "/catalogs/" + myCatalogName + "/cart";

                        cartRef = new Firebase(url);

                        $firebase(cartRef).$on("loaded", function (cart) {
                            var myCart = [];

                            angular.forEach(cart, function (item) {
                                myCart.push(item);
                            });

                            cartByUser[user.id] = {
                                name: user.name,
                                cart: myCart
                            };
                        });
                    });

                });

            },

            getCartByItem: function () {},

            getCartByUser: function () {
                return cartByUser;
            }

        };

    }]);
