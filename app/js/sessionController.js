(function () {
    "use strict";

    angular
        .module("piadinamia")
        .controller("SessionCtrl", SessionCtrl);

    SessionCtrl.$inject = [
        "sessionService",
        "catalogService",
        "cartService",
        "sharedCartService",
        "$location",
        "$firebaseObject",
        "Firebase",
        "FBURL"
    ];

    function SessionCtrl(sessionService, catalogService, cartService,
        sharedCartService, $location, $firebaseObject, Firebase, FBURL) {
        var vm = this,
            dataRef = new Firebase(FBURL);

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

        dataRef.onAuth(function (authData) {
            var userId,
                ref,
                userSync;

            if (!authData) {
                return;
            }

            userId = authData.uid.split(":")[1];

            ref = new Firebase(FBURL + "/users/" + userId);
            userSync = $firebaseObject(ref);

            $location.path("/");

            userSync.$loaded().then(function () {
                vm.info.name = userSync.name;
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
