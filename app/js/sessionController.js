"use strict";

angular.module("piadinamia").controller("SessionCtrl", [
    "$scope",
    "sessionService",
    "catalogService",
    "cartService",
    "sharedCartService",
    "$location",
    "$firebase",
    "Firebase",
    "FBURL",
    function ($scope,
              sessionService,
              catalogService,
              cartService,
              sharedCartService,
              $location,
              $firebase,
              Firebase,
              FBURL) {

        var dataRef = new Firebase(FBURL);

        $scope.session = {
            err: null,
            email: null,
            pass: null,
            name: null,
            isLogging: false
        };

        if ($scope.auth) {
            $location.path("/");
        }

        dataRef.onAuth(function (authData) {
            var userId,
                ref,
                sync,
                userSync;

            if (!authData) {
                return;
            }

            userId = authData.uid.split(":")[1];

            $scope.auth = {
                user: userId
            };

            ref = new Firebase(FBURL + "/users/" + userId);
            sync = $firebase(ref);
            userSync = sync.$asObject();

            $location.path("/");

            userSync.$loaded().then(function () {
                $scope.session.name = userSync.name;
            });

            catalogService.load(userId, function (catalog, catalogName) {
                $scope.catalog = catalog;

                cartService.init(userId, catalogName);
                $scope.cart = cartService;

                sharedCartService.init(userId, catalogName);
                $scope.sharedCart = sharedCartService;

                $scope.master = catalogService;
            });
        });

        $scope.logout = function () {
            sessionService.logout("/signin");
        };

        $scope.login = function (callback) {
            $scope.session.err = null;
            $scope.session.isLogging = true;

            sessionService.login($scope.session.email, $scope.session.pass, "/",
                function (err, user) {
                    $scope.session.err = err && err.message || null;
                    if (typeof(callback) === "function") {
                        callback(err, user);
                    }
                    $scope.session.isLogging = false;
                    $scope.$apply();
                });
        };

        $scope.createAccount = function () {
            $scope.session.err = null;

            if (!$scope.session.email) {
                $scope.session.err = "Please enter a valid email address";
            } else if (!$scope.session.pass) {
                $scope.session.err = "Please enter a password";
            } else {
                sessionService.createAccount($scope.session.name,
                    $scope.session.email, $scope.session.pass,
                    function (err) {
                    if (err) {
                        $scope.session.err = err.message;
                        $scope.$apply();
                    }
                });
            }
        };

    }
]);
