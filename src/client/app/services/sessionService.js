"use strict";

(function () {
    angular
        .module("piadinamia")
        .factory("sessionService", sessionService);

    sessionService.$inject = ["$q"];

    function sessionService($q) {
        var deferred = $q.defer(),
            authRef = firebase.auth(),
            service = {
                isLogged: isLogged,
                login: login,
                logout: logout,
                createAccount: createAccount
            };

        authRef.onAuthStateChanged(function (authData) {
            var userId;

            if (!authData) {
                return;
            }

            userId = authData.uid.split(":")[1] || authData.uid;

            deferred.resolve(userId);
        });

        return service;

        function isLogged() {
            return deferred.promise;
        }

        function login(email, pass, callback) {
            authRef.signInWithEmailAndPassword(email, pass)
                .then(function (authData) {
                    if (callback) {
                        callback(null, authData);
                    }
                })
                .catch(function (err) {
                    callback(err);
                });
        }

        function logout() {
            authRef.signOut();
        }

        function createAccount(name, email, pass, callback) {
            authRef.createUserWithEmailAndPassword(email, pass).then(function () {

                service.login(email, pass, function (err, authData) {
                    var userId;

                    if (!err && authData) {
                        userId = authData.uid.split(":")[1] || authData.uid;
                        createProfile(userId, name, email);
                    }
                });
            }).catch(function (err) {
                callback(err);
            });
        }

        function createProfile(id, name, email, callback) {
            firebase.database().ref("users/" + id).set({
                email: email,
                name: name,
                catalog: "piadinamia",
                catalogs: {}
            }, function (err) {
                if (callback) {
                    callback(err);
                }
            });
        }

    }

}());
