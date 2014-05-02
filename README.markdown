PIADINAMIA
==========

Piadinamia is a (working in progress) social shopping cart app based on
[AngularJS](https://angularjs.org/) and [Firebase](https://www.firebase.com/).

On mobile side I have been considering the following approach:
- [trigger.io](https://trigger.io/)
- [ionic](http://ionicframework.com/)
- [Ratchet](http://goratchet.com/)

Requirements
------------

- `User`
    - [x] create account
    - [x] login
    - [x] logout

- `Catalog`
    - [ ] list my catalogs (with stats - copies, carts, etc.)
    - [ ] select catalog
    - [ ] create new catalog
    - [ ] search (and copy) your catalogs
    - [ ] modify (or delete) catalog

- `Cart`
    - [x] modify my cart (add, remove items)

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
            "catalogs": {
                "email": "my email",
                "name": "user 2",
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
- [Firesafe](https://github.com/tomlarkworthy/firesafe).

Installation
============

    $ git clone git@github.com:albertosantini/piadinamia.git
    $ cd piadinamia
    $ npm install

    Edit `FBURL` constant in `app/js/app.js`.

    $ node server.js

Tested locally with node 0.10.x.
