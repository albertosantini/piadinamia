"use strict";

angular.module("piadinamia.services.profileService", [])
    .factory("profileService", ["Firebase", "FBURL",
        function (Firebase, FBURL) {
            return function (id, name, email, callback) {
                new Firebase(FBURL).child("users/" + id).set({
                    email: email,
                    name: name
                }, function (err) {
                    if (callback) {
                        callback(err);
                    }
                });
            };
        }]);
