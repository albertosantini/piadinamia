PIADINAMIA
==========

Piadinamia is a (working in progress) shopping cart app.

It is a good candidate app for AngularJS and Firebase.

See [AngularJS Tutorial: Learn to Rapidly Build Real-time Web Apps with Firebase](http://www.thinkster.io/pick/eHPCs7s87O/angularjs-tutorial-learn-to-rapidly-build-real-time-web-apps-with-firebase).

See also the following [angular login example](https://github.com/mrgamer/angular-login-example).

See also the [AngularFire seed](https://github.com/firebase/angularFire-seed).

On mobile side I have been considering the following approach:
- [trigger.io](https://trigger.io/)
- [ionic](http://ionicframework.com/)

Abstract
--------

Social shopping cart website based on AngularJS and Firebase.

Requirements
------------

- `User`
    - [X] create account
    - [X] login
    - [X] logout

- `Catalog`
    - [ ] list my catalogs (with stats - copies, carts, etc.)
    - [ ] select catalog
    - [ ] create new catalog
    - [ ] search (and copy) your catalogs
    - [ ] modify (or delete) catalog

- `Cart`
    - [X] modify my cart (add, remove items)

- `Reports`
    - [X] report carts by items (per default catalog)
    - [X] report carts by users (per default catalog)

Defaults, constraints
---------------------

- For a new user, piadinamia catalog is attached with a cart
- Set last used catalog as default (or piadinamia system catalog)
- A user may have many catalogs, but a catalog contains only one cart
- Add a due date to the cart (to purge them)?

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

Read [Denormalizing Your Data is Normal](https://www.firebase.com/blog/2013-04-12-denormalizing-is-normal.html).

Consider also [Firesafe](https://github.com/tomlarkworthy/firesafe).

Installation
============

    $ git clone git@github.com:albertosantini/node-piadinamia.git
    $ cd node-piadinamia
    $ npm install

    Edit `FBURL` constant in `app/js/app.js`.

    $ node server.js

Tested with node 0.10.x.
