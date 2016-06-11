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
        - [ ] add the default catalog to the `master`
    - [x] login
    - [x] logout

- `Catalog`
    - [x] create and remove a catalog
        - [ ] add and remove the catalog to the `master`
    - [x] select a catalog of the user
    - [x] search a catalog of another user
    - [ ] select a catalog of another user (working in progress)
        - [ ] copy the catalog (to be defined)
        - [ ] add the user to the subscribers
    - [x] add (or remove) items in the catalog

- `Cart`
    - [x] modify quantity and add, remove items in the cart

- `Shared Cart`
    - [x] report carts by items
    - [x] report carts by users

Defaults and constraints
------------------------

- Catalog `piadinamia` is the default one and an example cart is attached
- A user may have many catalogs, but the catalog contains only one cart

Model
---------------------

- `users` with catalogs and carts
- `master` list of catalogs with subscribers

```
{
    "users": {
        "userId-1": {
            "email": "my email",
            "name": "user 1",
            "catalog": "mycat1",
            "catalogs": {
                "mycat1": {
                    "name": "mycat1",
                    "description": "my catalog",
                    "items": {
                        "item a": 0.75,
                        "item b": 2.35,
                        "item c": 1.05
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
            "catalog": "mycat1",
            "catalogs": {
                "mycat1": {
                    "name": "mycat1",
                    "description": "my catalog",
                    "items": {
                        "item a": 0.75,
                        "item b": 2.35,
                        "item c": 1.05
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

    "master": {
        "mycat1@user 1": {
            "owner": userId-1,
            "subscribers": {
                "0": {
                    "id": userId-1,
                    "name": "my user",
                },
                "1": {
                    "id": "userId-2",
                    "name": "user 2"
                }
            }            
        },

        "mycat1@user 2": {
            "owner": userId-2,
            "subscribers": {
                "0": {
                    "id": "userId-2",
                    "name": "user 2"
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
