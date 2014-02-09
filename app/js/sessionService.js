"use strict";

angular.module("piadinamia").factory("sessionService",
    ["$firebaseSimpleLogin", "$location", "Firebase", "FBURL",
    function ($firebaseSimpleLogin, $location, Firebase, FBURL) {
        var auth = null;

        return {
            init: function (path) {
                auth = $firebaseSimpleLogin(new Firebase(FBURL), {
                    path: path
                });

                return auth;
            },

            login: function (email, pass, redirect, callback) {
                auth.$login("password", {
                    email: email,
                    password: pass,
                    rememberMe: true
                }).then(function (user) {
                    if (redirect) {
                        $location.path(redirect);
                    }

                    if (callback) {
                        callback(null, user);
                    }
                }, callback);
            },

            logout: function (redirectPath) {
                auth.$logout();

                if (redirectPath) {
                    $location.path(redirectPath);
                }
            },

            createAccount: function (name, email, pass, callback) {
                auth.$createUser(email, pass, function (err, user) {
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
