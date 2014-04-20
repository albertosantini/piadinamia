"use strict";

angular.module("piadinamia").factory("cartService",
    ["$firebase", "Firebase", "FBURL",
    function ($firebase, Firebase, FBURL) {
        var myCart = [],
            myCatalogName = "",
            myUserId;

        return {
            init: function (cart, catalogName, userId) {
                myCart = cart;
                myCatalogName = catalogName;
                myUserId = userId;
            },

            getItems: function () {
                return myCart;
            },

            saveItems: function () {
                var fburl = FBURL + "/users/" + myUserId +
                        "/catalogs/" + myCatalogName + "/cart",
                    cartRef = new Firebase(fburl);

                $firebase(cartRef).$set(myCart);

                if (myCart.length === 0) {
                    $firebase(cartRef).$set("");
                }
            },

            getTotalCount: function () {
                var total = 0;

                myCart.forEach(function (item) {
                    total += item.qty;
                });

                return total;
            },

            getTotalPrice: function () {
                var total = 0;

                myCart.forEach(function (item) {
                    total += item.price * item.qty;
                });

                return total;
            },

            addItem: function (item, price, qty) {
                var self = this,
                    found = false;

                qty = qty || 1;

                myCart.every(function (el, index) {
                    if (el.item === item) {
                        found = true;

                        myCart[index].qty += qty;
                        myCart[index].total = myCart[index].price *
                            myCart[index].qty;

                        if (myCart[index].qty === 0) {
                            self.clearItem(index);
                        }

                        return false;
                    }

                    return true;
                });

                if (!found) {
                    myCart.push({
                        item: item,
                        price: price,
                        qty: 1,
                        total: price
                    });
                }

                this.saveItems();
            },

            clearItem: function (index) {
                myCart.splice(index, 1);
                this.saveItems();
            }
        };

    }]);
