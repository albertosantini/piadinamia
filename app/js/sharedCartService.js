"use strict";

angular.module("piadinamia").factory("sharedCartService",
    ["$firebase", "Firebase", "FBURL",
    function ($firebase, Firebase, FBURL) {
        var myCustomers = [],
            fburl;

        return {
            init: function (customers, catalogName, userId) {
                var customersRef;

                myCustomers = customers;
                fburl = FBURL + "/users/" + userId +
                    "/catalogs/" + catalogName + "/customers";

                customersRef = new Firebase(fburl);

                $firebase(customersRef).$on("change", function() {
                    $firebase(customersRef).$on("loaded", function (customers) {
                        myCustomers = [];

                        angular.forEach(customers, function(item) {
                            myCustomers.push(item);
                        });
                    });
                });
            },

            getCartByItem: function () {},

            getCartByUser: function () {}

        };

    }]);
