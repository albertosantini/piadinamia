"use strict";

(function () {
    angular
        .module("piadinamia")
        .factory("sessionService", sessionService);

    sessionService.$inject = ["$location"];

    function sessionService($location) {
        var authRef = firebase.auth(),
            service = {
                login: login,
                logout: logout,
                createAccount: createAccount
            };

        return service;

        function login(email, pass, redirect, callback) {
            authRef.signInWithEmailAndPassword(email, pass)
                .then(function (authData) {
                    if (redirect) {
                        $location.path(redirect);
                    }

                    if (callback) {
                        callback(null, authData);
                    }
                })
                .catch(function (err) {
                    callback(err);
                });
        }

        function logout(redirectPath) {
            authRef.signOut();

            if (redirectPath) {
                $location.path(redirectPath);
            }
        }

        function createAccount(name, email, pass, callback) {
            authRef.createUser({
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
            authRef.child("users/" + id).set({
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
