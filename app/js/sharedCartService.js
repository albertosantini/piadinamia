"use strict";

angular.module("piadinamia").factory("sharedCartService",
    ["cartService", "$firebase", "Firebase", "FBURL",
    function (cartService, $firebase, Firebase, FBURL) {
        var myCustomers = [],
            myCatalogName,
            fburl;

        return {
            init: function (customers, catalogName, userId) {
                var customersRef;

                myCustomers = customers;
                myCatalogName = catalogName;

                fburl = FBURL + "/users/" + userId +
                    "/catalogs/" + catalogName + "/customers";

                customersRef = new Firebase(fburl);

                $firebase(customersRef).$on("change", function () {
                    $firebase(customersRef).$on("loaded", function (customers) {
                        myCustomers = [];

                        angular.forEach(customers, function (item) {
                            myCustomers.push(item);
                        });
                    });
                });
            },

            getCartByItem: function () {},

            getCartByUser: function () {
                var cartByUser = {};

                myCustomers.forEach(function (userId) {
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
