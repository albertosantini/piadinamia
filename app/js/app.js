/*global $, simpleCart */

(function () {
    "use strict";

    var app = angular.module("piadinamia", [
        "firebase",
        "ui.bootstrap",
        "ngRoute"
    ]);

    app.constant("FBURL", "https://piadinamia.firebaseio.com/");

    app.config(["$routeProvider", function ($routeProvider) {
        $routeProvider
            .when("/", { templateUrl: "views/default.html" })
            .when("/signin", { templateUrl: "views/users/signin.html" })
            .when("/signup", { templateUrl: "views/users/signup.html" })
            .otherwise({ redirectTo: "/" });
    }]);

    app.run(["sessionService", "$rootScope", "FBURL",
        function (sessionService, $rootScope, FBURL) {
            $rootScope.auth = sessionService.init("/signin");
            $rootScope.FBURL = FBURL;
        }]);

    simpleCart({
        checkout: {
            type: "custom",
            fn: function () {
                // myCheckout(this);
            }
        },
        currency: "EUR",
        cartColumns: [
            {attr: "name", label: "Item"},
            {view: "currency", attr: "price", label: "Price"},
            {attr: "quantity", label: "Qty"},
            {view: "increment", label: false},
            {view: "decrement", label: false},
            {view: "currency", attr: "total", label: "Total" },
            {view: "remove", text: "Remove ", label: false}
        ],
        cartStyle: "table"
    });

    simpleCart.currency({
        code: "EUR",
        name: "EUR",
        symbol: "&euro;",
        delimiter: " ",
        decimal: ",",
        after: true,
        accuracy: 2
    });

    simpleCart.bind("update", function () {
        if (simpleCart.quantity() === 0) {
            $(".simpleCart_items").hide();
        } else {
            $(".simpleCart_items").show();
        }
    });
}());
