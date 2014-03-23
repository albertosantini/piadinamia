/*global $, simpleCart */

(function () {
    "use strict";

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

        simpleCart.each(function (item) {
            console.log(item.get("name"), item.get("quantity"));
        });
    });

}());
