"use strict";

(function () {
    angular
        .module("piadinamia")
        .factory("cartService", cartService);

    cartService.$inject = ["$timeout", "sessionService"];

    function cartService($timeout, sessionService) {
        var service = {
                getItems: getItems,
                saveItem: saveItem,
                getTotalCount: getTotalCount,
                getTotalPrice: getTotalPrice,
                addItem: addItem,
                clearItem: clearItem
            },
            cartUrl,
            cartRef,
            myCart = [];

        sessionService.isLogged().then(activate);

        return service;

        function activate(userId) {
            var catalogNameRef = firebase.database().ref("/users/" +
                    userId + "/catalogs/default/name");

            catalogNameRef.on("value", function (catalogNameSnapshot) {
                var catalogName = catalogNameSnapshot.val();

                cartUrl = "/users/" + userId + "/catalogs/" +
                    catalogName + "/cart";
                cartRef = firebase.database().ref(cartUrl);
                cartRef.on("value", function (snapshot) {
                    var cart = snapshot.val(),
                        items = [];

                    if (!cart) {
                        return;
                    }

                    Object.keys(cart).forEach(function (item) {
                        cart[item].$id = item;
                        items.push(cart[item]);
                    });

                    $timeout(function () {
                        myCart.length = 0;
                        angular.extend(myCart, items);
                    });
                });
            });
        }

        function getItems() {
            return myCart;
        }

        function saveItem(index) {
            var itemRef = cartRef.child(myCart[index].$id),
                newData = angular.copy(myCart[index]);

            delete newData.$id;
            itemRef.update(newData);
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
            var found = false,
                newItem,
                newItemKey,
                newItemRef;

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
                newItem = {
                    item: item,
                    price: price,
                    qty: 1,
                    total: price
                };
                newItemKey = cartRef.push().key;
                newItemRef = cartRef.child(newItemKey);

                newItemRef.update(newItem);
                newItem.$id = newItemKey;
                myCart.push(newItem);
            }
        }

        function clearItem(index) {
            var itemRef = cartRef.child(myCart[index].$id);

            itemRef.remove();
            myCart.splice(index, 1);
        }
    }

}());
