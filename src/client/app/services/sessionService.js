"use strict";

(function() {
    angular
        .module("piadinamia")
        .factory("sessionService", sessionService);

    sessionService.$inject = ["$q"];

    function sessionService($q) {
        const deferred = $q.defer(),
            authRef = firebase.auth(),
            service = {
                isLogged,
                login,
                logout,
                createAccount
            };

        authRef.onAuthStateChanged(authData => {
            if (!authData) {
                return;
            }

            deferred.resolve(authData.uid.split(":")[1] || authData.uid);
        });

        return service;

        function isLogged() {
            return deferred.promise;
        }

        function login(email, pass, callback) {
            authRef.signInWithEmailAndPassword(email, pass)
                .then(authData => {
                    if (callback) {
                        callback(null, authData); /* eslint callback-return:off */
                    }
                })
                .catch(err => {
                    callback(err);
                });
        }

        function logout() {
            authRef.signOut();
        }

        function createAccount(name, email, pass, callback) {
            authRef.createUserWithEmailAndPassword(email, pass).then(() => {

                service.login(email, pass, (err, authData) => {
                    let userId;

                    if (!err && authData) {
                        userId = authData.uid.split(":")[1] || authData.uid;
                        createProfile(userId, name, email);
                    }
                });
            }).catch(err => {
                callback(err);
            });
        }

        function createProfile(id, name, email, callback) {
            firebase.database().ref(`users/${id}`).set({
                email,
                name,
                catalog: "piadinamia",
                catalogs: {}
            }, err => {
                if (callback) {
                    callback(err); /* eslint callback-return:off */
                }
            });
        }

    }

}());
