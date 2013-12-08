"use strict";

angular.module("piadinamia.services.login",
    ["piadinamia.services.profileService"])
    .factory("loginService", ["angularFireAuth", "profileService", "$location",
        function (angularFireAuth, profileService, $location) {
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
                    angularFireAuth.createUser(email, pass,
                        function (err, user) {
                            if (callback) {
                                callback(err, user);
                            }
                        });
                },

                createProfile: profileService
            };
        }]);
