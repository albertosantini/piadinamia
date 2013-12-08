"use strict";

angular.module("piadinamia").controller("SessionCtrl",
    ["$scope", "sessionService", "$location", "angularFire", "FBURL",
    function ($scope, sessionService, $location, angularFire, FBURL) {
        $scope.err = null;
        $scope.email = null;
        $scope.pass = null;
        $scope.name = null;
        $scope.isLogging = false;

        if (!!$scope.auth) {
            $location.path("/");
        }

        $scope.$on("angularFireAuth:login", function () {
            $location.path("/");
            angularFire(new Firebase(FBURL + "/users/" + $scope.auth.id),
                $scope, "user");
            $scope.isLogging = false;
        });

        $scope.logout = function () {
            sessionService.logout("/signin");
        };

        $scope.login = function (callback) {
            $scope.err = null;
            $scope.isLogging = true;

            sessionService.login($scope.email, $scope.pass, "/",
                function (err, user) {
                    $scope.err = err || null;
                    if (typeof(callback) === "function") {
                        callback(err, user);
                    }
                });
        };

        $scope.createAccount = function () {
            $scope.err = null;

            if (!$scope.email) {
                $scope.err = "Please enter a valid email address";
            } else if (!$scope.pass) {
                $scope.err = "Please enter a password";
            } else {
                sessionService.createAccount($scope.name,
                    $scope.email, $scope.pass, function (err, user) {
                    if (err) {
                        $scope.err = err.message;
                    } else {
                        $scope.login(function (err) {
                            if (!err) {
                                sessionService.createProfile(user.id,
                                    $scope.name, user.email);
                            }
                        });
                    }
                });
            }
        };
    }]);
