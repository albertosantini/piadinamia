PIADINAMIA
==========

Piadinamia is a shopping cart app.

It is a good candidate app for AngularJS and Firebase: [AngularJS Tutorial: Learn to Rapidly Build Real-time Web Apps with Firebase](http://www.thinkster.io/pick/eHPCs7s87O/angularjs-tutorial-learn-to-rapidly-build-real-time-web-apps-with-firebase).

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
    - select my catalog 
    - create new catalog
    - search (and copy) your catalogs

- `Tag`
    - list my tags (with stats)
    - select my tag
    - search (and select) your tags
    - create new tag
    
- `Cart` 
    - create my cart
    - modify my cart

- `Reports`
    - report carts by items
    - report carts by users

Defaults, constraints
---------------------

- set last used catalog as default (or piadinamia system catalog)
- set last used tag as default
- set last used cart as default
- `One user - many catalogs` > `One catalog - many tags` > `One tag - many carts`
- `One cart` > `One tag` > `One catalog` > `One user`
- Add a due date to the tag?

Use cases
---------

- `user/first time` > `create new catalog` > `create new tag` > `create my cart` > `modify my cart` > `report carts by items`
- `user/next time` > `select my tag` > `modify my cart` > `report carts by items`
- `user/another user` > `search your tags` > `create my cart` > `report carts by users`
- `user/next time` > `select my tag` > `report carts by users`
- `user/another user` > `search your tags` > `modify my cart` > `report carts by items`

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
