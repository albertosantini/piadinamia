/* global jQuery, _ */

(function ($, _) {
    "use strict";

    var catalogRawTemplate = $("#catalog-template").text(),
        catalogTemplate = _.template(catalogRawTemplate),
        $catalog = $("#catalog"),
        items = [
            {
                image: "img/piadina1.jpg",
                price: "3,00",
                name: "Piadina normale"
            },
            {
                image: "img/piadina2.jpg",
                price: "3,50",
                name: "Piadina farcita"
            },
            {
                image: "img/piadina3.jpg",
                price: "4,00",
                name: "Piadina con nutella"
            },
            {
                image: "img/piadina4.jpg",
                price: "3,50",
                name: "Piadina integrale"
            },
            {
                image: "img/still-water.jpg",
                price: "1,50",
                name: "Acqua naturale"
            },
            {
                image: "img/sparkling-water.jpg",
                price: "2,00",
                name: "Acqua frizzante"
            },
            {
                image: "img/drinks.jpg",
                price: "2,50",
                name: "Bibita"
            }
        ];

    $catalog.html(catalogTemplate({ catalog: items }));
}(jQuery, _));
