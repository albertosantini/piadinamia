"use strict";

(function () {
    angular
        .module("piadinamia")
        .factory("sessionService", sessionService);

    sessionService.$inject = ["$location", "Firebase", "FBURL"];

    function sessionService($location, Firebase, FBURL) {
        var dataRef = new Firebase(FBURL),
            service = {
                login: login,
                logout: logout,
                createAccount: createAccount
            };

        return service;

        function login(email, pass, redirect, callback) {
            dataRef.authWithPassword({
                email: email,
                password: pass
            }, function loginWithPassword(err, authData) {
                if (!err && redirect) {
                    $location.path(redirect);
                }

                if (callback) {
                    callback(err, authData);
                }
            });
        }

        function logout(redirectPath) {
            dataRef.unauth();

            if (redirectPath) {
                $location.path(redirectPath);
            }
        }

        function createAccount(name, email, pass, callback) {
            dataRef.createUser({
                "email": email,
                "password": pass
            }, function (err) {
                if (!err) {
                    service.login(email, pass, "/", function (err2, authData) {
                        var userId = authData.uid.split(":")[1];
                        if (!err2) {
                            createProfile(userId, name, email);
                        }
                    });
                }
                if (callback) {
                    callback(err);
                }
            });
        }

        function createProfile(id, name, email, callback) {
            dataRef.child("users/" + id).set({
                email: email,
                name: name,
                catalogs: ""
            }, function (err) {
                if (callback) {
                    callback(err);
                }
            });
        }

    }

}());
