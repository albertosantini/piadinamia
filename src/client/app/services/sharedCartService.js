"use strict";

(function() {
    angular
        .module("piadinamia")
        .factory("sharedCartService", sharedCartService);

    sharedCartService.$inject = ["$timeout", "sessionService"];

    function sharedCartService($timeout, sessionService) {
        const service = {
                getCartByItem,
                getCartByUser

            },
            cartByUser = {},
            cartByItem = {};

        sessionService.isLogged().then(activate);

        return service;

        function activate(userId) {
            const catalogNameRef = firebase.database().ref(`/users/${userId}/catalog`);

            catalogNameRef.on("value", catalogNameSnapshot => {
                const catalogName = catalogNameSnapshot.val();

                const subscribersRef = firebase.database().ref(`/users/${userId}/catalogs/${catalogName}/subscribers`);

                subscribersRef.on("value", snapshot => {
                    const subscribers = snapshot.val();

                    subscribeCarts(catalogName, subscribers);
                });
            });
        }

        function subscribeCarts(catalogName, subscribers) {
            if (!subscribers) {
                return;
            }

            reset(cartByUser);
            reset(cartByItem);

            subscribers.forEach(user => {
                const cartRef = firebase.database().ref(`/users/${user.id}/catalogs/${catalogName}/cart`);

                cartRef.on("value", snapshot => {
                    const cart = snapshot.val();

                    $timeout(() => {
                        if (cart) {
                            calcCartByUser(user, cart);
                            calcCartByItem();
                        }
                    });
                });
            });
        }

        function calcCartByUser(user, cart) {
            const myCart = [];

            let total = 0;

            angular.forEach(cart, item => {
                myCart.push(item);
                total += item.qty * item.price;
            });

            cartByUser[user.id] = {
                name: user.name || "Myself",
                total,
                cart: myCart
            };
        }

        function calcCartByItem() {
            reset(cartByItem);

            angular.forEach(cartByUser, user => {
                user.cart.forEach(item => {
                    let counter = 0;

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

        function getCartByItem() {
            return cartByItem;
        }

        function getCartByUser() {
            return cartByUser;
        }

        function reset(obj) {
            let key;

            for (key in obj) {
                if (obj.hasOwnProperty(key)) {
                    delete obj[key];
                }
            }
        }

    }

}());
