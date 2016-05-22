"use strict";

(function () {
    angular
        .module("piadinamia")
        .controller("SessionCtrl", SessionCtrl);

    SessionCtrl.$inject = [
        "sessionService",
        "catalogService",
        "cartService",
        "sharedCartService",
        "$location"
    ];

    function SessionCtrl(sessionService, catalogService, cartService,
        sharedCartService, $location) {
        var vm = this,
            authRef = firebase.auth();

        vm.info = {
            err: null,
            email: null,
            pass: null,
            name: null,
            isLogging: false
        };

        vm.login = login;
        vm.logout = logout;
        vm.createAccount = createAccount;

        authRef.onAuthStateChanged(function (authData) {
            var userId,
                userRef;

            if (!authData) {
                return;
            }

            $location.path("/");

            userId = authData.uid.split(":")[1];
            userRef = firebase.database().ref("/users/" + userId);
            userRef.once("value").then(function (snapshot) {
                vm.info.name = snapshot.val().name;
            });

            catalogService.load(userId, function (catalog, catalogName) {
                vm.catalog = catalog;

                cartService.init(userId, catalogName);
                vm.cart = cartService;

                sharedCartService.init(userId, catalogName);
                vm.sharedCart = sharedCartService;

                vm.master = catalogService;
            });
        });

        function logout() {
            vm.info = null;
            sessionService.logout("/signin");
        }

        function login(callback) {
            vm.info.err = null;
            vm.info.isLogging = true;

            sessionService.login(vm.info.email, vm.info.pass, "/",
                function (err, user) {
                    vm.info.err = err && err.message || null;
                    if (typeof (callback) === "function") {
                        callback(err, user);
                    }
                    vm.info.isLogging = false;
                });
        }

        function createAccount() {
            vm.info.err = null;

            if (!vm.info.email) {
                vm.info.err = "Please enter a valid email address";
            } else if (!vm.info.pass) {
                vm.info.err = "Please enter a password";
            } else {
                sessionService.createAccount(vm.info.name,
                    vm.info.email, vm.info.pass,
                    function (err) {
                        if (err) {
                            vm.info.err = err.message;
                        }
                    });
            }
        }

    }

}());
