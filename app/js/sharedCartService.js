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
                    console.log("subscribers loaded", subs, mySubscribers);
                    angular.forEach(subs, function (item) {
                        mySubscribers.push(item);
                    });
                    console.log(mySubscribers);
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

                        console.log("cart loaded", cart);
                        angular.forEach(cart, function (item) {
                            myCart.push(item);
                        });

                        cartByUser[user.id] = {
                            name: user.name,
                            cart: myCart
                        };
                    });

                    $firebase(cartRef).$on("change", function (cart) {
                        console.log("cart change", cart);
                        // cartByUser[user.id][parseInt(cart, 10)];
                    });
                });

            },

            getCartByItem: function () {},

            getCartByUser: function () {
                console.log("getCartByUser", mySubscribers);

                return cartByUser;
            }

        };

    }]);
