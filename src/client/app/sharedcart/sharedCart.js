"use strict";

(function () {
    angular
        .module("piadinamia")
        .component("sharedcart", {
            controller: SharedCart,
            templateUrl: "app/sharedcart/sharedCart.html"
        });

    SharedCart.$inject = ["$timeout", "sessionService"];

    function SharedCart($timeout, sessionService) {
        var vm = this,
            cartByUser = {},
            cartByItem = {};

        vm.getCartByItem = getCartByItem;
        vm.getCartByUser = getCartByUser;

        sessionService.isLogged().then(activate);

        function activate(userId) {
            var catalogNameRef = firebase.database().ref("/users/" +
                    userId + "/catalogs/default/name");

            catalogNameRef.once("value").then(function (catalogNameSnapshot) {
                var catalogName = catalogNameSnapshot.val();

                var subscribersRef = firebase.database().ref("/users/" +
                        userId + "/catalogs/" + catalogName + "/subscribers");

                subscribersRef.on("value", function (snapshot) {
                    var subscribers = snapshot.val();

                    subscribeCarts(catalogName, subscribers);
                });
            });
        }

        function subscribeCarts(catalogName, subscribers) {
            subscribers.forEach(function (user) {
                var cartRef = firebase.database().ref("/users/" + user.id +
                            "/catalogs/" + catalogName + "/cart");

                cartRef.on("value", function (snapshot) {
                    var cart = snapshot.val();

                    $timeout(function () {
                        calcCartByUser(user, cart);
                        calcCartByItem();
                    });
                });
            });
        }

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

        function getCartByItem() {
            return cartByItem;
        }

        function getCartByUser() {
            return cartByUser;
        }

    }

}());
