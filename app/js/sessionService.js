"use strict";

angular.module("piadinamia").factory("sessionService",
    ["angularFireAuth", "$location", "Firebase", "FBURL",
    function (angularFireAuth, $location, Firebase, FBURL) {
        return {
            login: function (email, pass, redirect, callback) {
                var p = angularFireAuth.login("password", {
                    email: email,
                    password: pass,
                    rememberMe: true
                });

                p.then(function (user) {
                    if (redirect) {
                        $location.path(redirect);
                    }

                    if (callback) {
                        callback(null, user);
                    }
                }, callback);
            },

            logout: function (redirectPath) {
                angularFireAuth.logout();

                if (redirectPath) {
                    $location.path(redirectPath);
                }
            },

            createAccount: function (name, email, pass, callback) {
                angularFireAuth.createUser(email, pass, function (err, user) {
                    if (callback) {
                        callback(err, user);
                    }
                });
            },

            createProfile: function (id, name, email, callback) {
                new Firebase(FBURL).child("users/" + id).set({
                    email: email,
                    name: name
                }, function (err) {
                    if (callback) {
                        callback(err);
                    }
                });
            }
        };
    }]);
