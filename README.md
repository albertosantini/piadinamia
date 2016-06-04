PIADINAMIA
==========
[![Build Status](https://travis-ci.org/albertosantini/piadinamia.png)](https://travis-ci.org/albertosantini/piadinamia)

Piadinamia is a social shopping cart app based on [AngularJS](https://angularjs.org/)
and [Firebase](https://www.firebase.com/).

Register a user with fake credentials and signin in two different tabs or
browsers to play with the app.

Features
--------

- `User`
    - [x] create account
    - [x] login
    - [x] logout

- `Catalog`
    - [ ] list my catalogs (with stats - copies, carts, etc.)
    - [ ] create new catalog
    - [ ] search and select catalogs
    - [X] add (or remove) items in the catalog

- `Cart`
    - [x] modify quantity and add, remove items in the cart

- `Reports`
    - [x] report carts by items
    - [x] report carts by users

Defaults and constraints
------------------------

- Catalog `piadinamia` is the default one and an example cart is attached
- Last used catalog and cart as default
- A user may have many catalogs, but the catalog contains only one cart

Model
-----

```
{
    "users": {
        "userId-1": {
            "email": "my email",
            "name": "user 1",
            "catalogs": {
                "default": {
                    name: "mycat1",
                }
                "mycat1": {
                    "name": "mycat1",
                    "description": "my catalog",
                    "private": false,
                    "items": {
                        "item a": 0.75,
                        "item b": 2.35,
                        "item c": 1.05
                    },
                    "subscribers": {
                        "0": {
                            "id": userId-1,
                            "name": "my user",
                        },
                        "1": {
                            "id": "userId-2",
                            "name": "user 2"
                        }
                    },
                    "cart": {
                        "0": {
                            "item": "item a",
                            "price": 0.75,
                            "qty": 2,
                            "total": 1.50
                        },
                        "1": {
                            "item": "item b",
                            "price": 2.35,
                            "qty": 1,
                            "total": 2.35
                        }
                    }
                }
            }
        },

        "userId-2" {
            "email": "my email",
            "name": "user 2",
            "catalogs": {
                "default": {
                    name: "mycat1",
                }
                "mycat1": {
                    "name": "mycat1",
                    "description": "my catalog",
                    "private": false,
                    "items": {
                        "item a": 0.75,
                        "item b": 2.35,
                        "item c": 1.05
                    },
                    "subscribers": {
                        "0": {
                            "id": "userId-2",
                            "name": "user 2"
                        }
                    },
                    "cart": {
                        "0": {
                            "item": "item c",
                            "price": 1.05,
                            "qty": 2,
                            "total": 2.10
                        }
                    }
                }
            }
        }

    }
}
```

Reference
=========

- [AngularJS Tutorial: Learn to Rapidly Build Real-time Web Apps with Firebase](http://www.thinkster.io/pick/eHPCs7s87O/angularjs-tutorial-learn-to-rapidly-build-real-time-web-apps-with-firebase).
- [Angular login example](https://github.com/mrgamer/angular-login-example).
- [AngularFire seed](https://github.com/firebase/angularFire-seed).
- [Denormalizing Your Data is Normal](https://www.firebase.com/blog/2013-04-12-denormalizing-is-normal.html).
- [Blazer](https://github.com/firebase/blaze_compiler).
- [Bolt](https://github.com/firebase/bolt).

Installation
============

    $ git clone git@github.com:albertosantini/piadinamia.git
    $ cd piadinamia
    $ npm install

Edit firebase config in `src/client/app/app.core.js`.

    $ npm start

Tested locally with Node.js 6.x and Firebase 3.x.
