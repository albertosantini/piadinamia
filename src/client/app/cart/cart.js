"use strict";

(function () {
    angular
        .module("piadinamia")
        .component("cart", {
            controller: Cart,
            templateUrl: "app/cart/cart.html"
        });

    Cart.$inject = ["$timeout", "sessionService"];

    function Cart($timeout, sessionService) {
        var vm = this,
            cartUrl,
            cartRef,
            myCart = [];

        vm.getItems = getItems;
        vm.saveItem = saveItem;
        vm.getTotalCount = getTotalCount;
        vm.getTotalPrice = getTotalPrice;
        vm.addItem = addItem;
        vm.clearItem = clearItem;

        sessionService.isLogged().then(activate);

        function activate(userId) {
            var catalogNameRef = firebase.database().ref("/users/" +
                    userId + "/catalogs/default/name");

            catalogNameRef.once("value").then(function (catalogNameSnapshot) {
                var catalogName = catalogNameSnapshot.val();

                cartUrl = "/users/" + userId + "/catalogs/" +
                    catalogName + "/cart";
                cartRef = firebase.database().ref(cartUrl);
                cartRef.on("value", function (snapshot) {
                    var cart = snapshot.val(),
                        items = [];

                    Object.keys(cart).forEach(function (item) {
                        cart[item].$id = item;
                        items.push(cart[item]);
                    });

                    $timeout(function () {
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
                        vm.clearItem(index);
                    } else {
                        cart.total = cart.price * cart.qty;
                        vm.saveItem(index);
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
