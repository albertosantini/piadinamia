"use strict";

angular.module("piadinamia").factory("sharedCartService",
    ["cartService", "$firebase", "Firebase", "FBURL",
    function (cartService, $firebase, Firebase, FBURL) {
        var mySubscribers = [],
            myCatalogName,
            fburl;

        return {
            init: function (subscribers, catalogName, userId) {
                var subscribersRef;

                mySubscribers = subscribers;
                myCatalogName = catalogName;

                fburl = FBURL + "/users/" + userId +
                    "/catalogs/" + catalogName + "/subscribers";

                subscribersRef = new Firebase(fburl);

                $firebase(subscribersRef).$on("change", function () {
                    $firebase(subscribersRef).$on("loaded", function (subs) {
                        mySubscribers = [];

                        angular.forEach(subs, function (item) {
                            mySubscribers.push(item);
                        });
                    });
                });
            },

            getCartByItem: function () {},

            getCartByUser: function () {
                var cartByUser = {};

                mySubscribers.forEach(function (userId) {
                    var cartRef,
                        url = FBURL + "/users/" + userId +
                            "/catalogs/" + myCatalogName + "/cart",
                        myCart;

                    cartRef = new Firebase(url);
                    $firebase(cartRef).$on("loaded", function (cart) {
                        myCart = [];

                        angular.forEach(cart, function (item) {
                            myCart.push(item);
                        });

                        cartByUser[userId] = myCart;
                    });

                });
            }

        };

    }]);
