/* global jQuery, _, depot, simpleCart */

(function ($, _, depot) {
    "use strict";

    var piadinamiaStore = depot("piadinamia"),
        store = piadinamiaStore.all();

    if (store.length !== 0) {
        $("#myTag").val(store[0].myTag);
        $("#ourTag").val(store[0].ourTag);
    }

    $("#gotoMyCart").on("click", function () {
        $("#myCart").fadeToggle();
        $("#ourCart").fadeToggle();
    });

    function getCartsByArticle(carts) {
        var items = {};

        carts.forEach(function (cart) {
            if (cart.value.items) {
                cart.value.items.forEach(function (item) {
                    if (items.hasOwnProperty(item.name)) {
                        items[item.name] += parseInt(item.quantity, 10);
                    } else {
                        items[item.name] =  parseInt(item.quantity, 10);
                    }
                });
            }
        });

        return items;
    }

    function renderOurcart(data) {
        var carts = data.rows,
            cartsRawTemplate = $("#carts-list-template").text(),
            cartsTemplate = _.template(cartsRawTemplate),
            $cartsList = $("#carts-list"),
            itemsRawTemplate = $("#items-list-template").text(),
            itemsTemplate = _.template(itemsRawTemplate),
            $itemsList = $("#items-list");

        $(".loading").hide();
        $("#myCart").fadeToggle();
        $("#ourCart").fadeToggle();

        if (carts.length > 0) {
            $cartsList.html(cartsTemplate({ carts: carts }));
            $itemsList.html(itemsTemplate({
                items: getCartsByArticle(carts)
            }));
        }
    }

    function renderError() {
        $("#messages").html("<strong>Sigh... " +
            "Qualcosa &egrave; andato storto!</strong>");
        $("#messages").show();
    }

    function myCheckout(cart) {
        var ourTag = $("#ourTag").val(),
            myTag = $("#myTag").val(),
            items = [],
            tags = {
                ourTag: ourTag,
                myTag: myTag
            };

        if (ourTag === "" || myTag === "") {
            $("#messages").html("<strong>Controlla i tuoi tag!</strong>");
            $("#messages").show();
            return;
        } else {
            $("#messages").hide();
        }

        $(".loading").show();

        if (store.length === 0) {
            piadinamiaStore.save(tags);
        } else {
            piadinamiaStore.update(store[0]._id, tags);
        }

        cart.each(function (item) {
            items.push(item.fields());
        });

        $.ajax({
            url: "/carts",
            type: "POST",
            data: {
                created_at: new Date(),
                ourTag: ourTag,
                myTag: myTag,
                items: items
            },
            success: renderOurcart,
            error: renderError
        });
    }

    simpleCart({
        checkout: {
            type: "custom",
            fn: function () { myCheckout(this); }
        },
        currency: "EUR",
        cartColumns: [
            {attr: "name", label: "Articolo"},
            {view: "currency", attr: "price", label: "Prezzo"},
            {attr: "quantity", label: "Qt&agrave;"},
            {view: "increment", label: false},
            {view: "decrement", label: false},
            {view: "currency", attr: "total", label: "Totale" },
            {view: "remove", text: "Cancella", label: false}
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

}(jQuery, _, depot));

