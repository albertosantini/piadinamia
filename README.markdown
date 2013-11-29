PIADINAMIA
==========

Piadinamia is a shopping cart app.

It is a good candidate app for AngularJS and Firebase: [AngularJS Tutorial: Learn to Rapidly Build Real-time Web Apps with Firebase](http://www.thinkster.io/pick/eHPCs7s87O/angularjs-tutorial-learn-to-rapidly-build-real-time-web-apps-with-firebase).

On mobile side I have been considering the following approach:
- [trigger.io](https://trigger.io/)
- [ionic](http://ionicframework.com/)


Frameworks in the radar:
- [select2](http://ivaynberg.github.io/select2/) - for catalog/cart select/search

Abstract
--------

Social shopping cart website.

Requirements
------------

- `User`
    - create account
    - login
    - logout
    
- `Catalog` 
    - list my catalogs (with stats - copies, carts, etc.)
    - select catalog 
    - create new catalog
    - search (and copy) your catalogs
    - modify (or delete) catalog

- `Cart` 
    - modify my cart (add, remove items)

- `Reports`
    - report carts by items (per default catalog)
    - report carts by users (per default catalog)

Defaults, constraints
---------------------

- set last used catalog as default (or piadinamia system catalog)
- after selecting a catalog, if it is the first time, an empty cart is attached
- `One user - many catalogs` > `One catalog - many carts`
- `One cart` > `One catalog` > `One user`
- Add a due date to the cart (to purge them)?

Use cases
---------

- `user/first time` > `create new catalog` > `modify my cart` > `report carts by items`
- `user/next time` > `select catalog` > `modify my cart` > `report carts by items`
- `user/another user` > `search your catalogs` > `report carts by users`
- `user/next time` > `select catalog` > `report carts by users`
- `user/another user` > `select catalog` > `modify my cart` > `report carts by items`

Model
-----

`me` _catalog publisher_
```
{
    "user": "user1",
    "default": "mycat1",
    "catalogs": {
        "mycat1": {
            "private": false,
            "items": 
                "id1": {
                    "item": "item1", 
                    "price": "0.75"
                },
                "id2": {
                    "item": "item2", 
                    "price": "2.35"
                },
                "id3": {
                    "item": "item3", 
                    "price": "1.05"
                }
            ],
            "consumers": {
                "user2": {
                    "total-quantity": 6,
                    "total-price": 8.90
                }
            },
            "cart": {
                rows: {
                    "row1": {
                        "item": "item1", 
                        "quantity": "2"
                    },
                    "row2": {
                        "item": "item2", 
                        "quantity": "3"
                    }
                }
            }
        }
    }
}
```

`another user` _catalog consumer_
```
{
    "user": "user2",
    "default": "mycat1",
    "catalogs": {
        "mycat1": {
            "publisher": "user1",
            "cart": {
                "rows": {
                    "row1": {
                        "item": "item2", 
                        "quantity": "2"
                    },
                    "row2": {
                        "item": "item3", 
                        "quantity": "4"
                    }
                }
            }
        }
    }
}
```

Read [Denormalizing Your Data is Normal](https://www.firebase.com/blog/2013-04-12-denormalizing-is-normal.html).

Example
=======

    var piadinamia = require("piadinamia");

    var config = {
        port: 8081
        pubdir: "/public/piadinamia",
        crm: {
            liveDomain: "x.y.z",
            liveUrl: "http://user1:pass1" +
                "@a.b.c",
            liveDb: "piadinamia",
            testingUrl: "http://user2:pass2" +
                "@a.b.c",
            testingDb: "piadinamia-staging",
            design: "piadinamia"
        }
    };

    piadinamia.startApp(config);

Installation
============

To install with [npm](http://github.com/isaacs/npm):

    npm install piadinamia

Tested with node 0.10.x.
