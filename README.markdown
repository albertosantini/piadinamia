PIADINAMIA
==========

Piadinamia is a shopping cart app.

It is a good candidate app for AngularJS and Firebase: [AngularJS Tutorial: Learn to Rapidly Build Real-time Web Apps with Firebase](http://www.thinkster.io/pick/eHPCs7s87O/angularjs-tutorial-learn-to-rapidly-build-real-time-web-apps-with-firebase).

See also the following [angular login example](https://github.com/mrgamer/angular-login-example).

On mobile side I have been considering the following approach:
- [trigger.io](https://trigger.io/)
- [ionic](http://ionicframework.com/)


Resources in the radar:
- [select2](http://ivaynberg.github.io/select2/) - for catalog/cart select/search
- [Font Awesome](http://fontawesome.io/) - for the carts icons

Abstract
--------

Social shopping cart website based on AngularJS and Firebase.

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

```
{
    "users": {
        "user1": {
            "name": "my user",
            "default": "mycat1",
            "catalogs": {
                "mycat1": {
                    "name": "my catalog",
                    "private": false,
                    "items": {
                        "item-id1": {
                            "name": "item1",
                            "price": "0.75"
                        },
                        "item-id2": {
                            "name": "item2",
                            "price": "2.35"
                        },
                        "item-id3": {
                            "name": "item3",
                            "price": "1.05"
                        }
                    },
                    "customers": {
                        "user2": {
                            "total-quantity": 6,
                            "total-price": 8.90
                        }
                    },
                    "cart": {
                        "items": {
                            "row-id1": {
                                "item": "item-id1",
                                "quantity": "2"
                            },
                            "row-id2": {
                                "item": "item-id2",
                                "quantity": "3"
                            }
                        }
                    }
                }
            }
        },

        "user2" {
            "name": "another user",
            "default": "mycat1",
            "catalogs": {
                "mycat1": {
                    "publisher": "user1",
                    "cart": {
                        "items": {
                            "row-id1": {
                                "item": "item-id2",
                                "quantity": "2"
                            },
                            "row-id2": {
                                "item": "item-id3",
                                "quantity": "4"
                            }
                        }
                    }
                }
            }
        }
    }

}
```

Read [Denormalizing Your Data is Normal](https://www.firebase.com/blog/2013-04-12-denormalizing-is-normal.html).

Installation
============

    $ git clone git@github.com:albertosantini/node-piadinamia.git
    $ cd node-piadinamia
    $ npm install
    
    Edit `FBURL` constant in `app/js/app.js`.

    $ node server.js

Tested with node 0.10.x.
