"use strict";

(function () {
    angular
        .module("piadinamia")
        .factory("cartService", cartService);

    cartService.$inject = [];

    function cartService() {
        var myCart = [],
            service = {
                init: init,
                getItems: getItems,
                saveItem: saveItem,
                getTotalCount: getTotalCount,
                getTotalPrice: getTotalPrice,
                addItem: addItem,
                clearItem: clearItem
            },
            cartUrl,
            cartRef;

        return service;

        function init(userId, catalogName) {
            cartUrl = "/users/" + userId + "/catalogs/" + catalogName + "/cart";
            cartRef = firebase.database().ref(cartUrl);

            cartRef.once("value").then(function (snapshot) {
                var cart = snapshot.val();

                myCart.length = 0;
                Object.keys(cart).forEach(function (item) {
                    cart[item].$id = item;
                    myCart.push(cart[item]);
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
