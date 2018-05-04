"use strict";

(function() {
    angular
        .module("piadinamia")
        .factory("cartService", cartService);

    cartService.$inject = ["$timeout", "sessionService"];

    function cartService($timeout, sessionService) {
        const service = {
            getItems,
            saveItem,
            getTotalCount,
            getTotalPrice,
            addItem,
            clearItem
        };
        const myCart = [];

        let cartUrl;
        let cartRef;

        sessionService.isLogged().then(activate);

        return service;

        function activate(userId) {
            const catalogNameRef = firebase.database().ref(`/users/${userId}/catalog`);

            catalogNameRef.on("value", catalogNameSnapshot => {
                const catalogName = catalogNameSnapshot.val();

                cartUrl = `/users/${userId}/catalogs/${catalogName}/cart`;
                cartRef = firebase.database().ref(cartUrl);
                cartRef.on("value", snapshot => {
                    const cart = snapshot.val(),
                        items = [];

                    if (cart) {
                        Object.keys(cart).forEach(item => {
                            cart[item].$id = item;
                            items.push(cart[item]);
                        });
                    }

                    $timeout(() => {
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
            const itemRef = cartRef.child(myCart[index].$id),
                newData = angular.copy(myCart[index]);

            delete newData.$id;
            itemRef.update(newData);
        }

        function getTotalCount() {
            let total = 0;

            myCart.forEach(item => {
                total += item.qty;
            });

            return total;
        }

        function getTotalPrice() {
            let total = 0;

            myCart.forEach(item => {
                total += item.price * item.qty;
            });

            return total;
        }

        function addItem(item, price, qty) {
            let found = false,
                newItem,
                newItemKey,
                newItemRef;

            const myQty = qty || 1;

            myCart.every((el, index) => {
                const cart = myCart[index];

                if (el.item === item) {
                    found = true;

                    cart.qty += myQty;

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
                    item,
                    price,
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
            const itemRef = cartRef.child(myCart[index].$id);

            itemRef.remove();
            myCart.splice(index, 1);
        }
    }

}());
