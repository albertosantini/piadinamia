"use strict";

(function () {
    angular
        .module("piadinamia")
        .factory("userService", userService);

    userService.$inject = ["$timeout", "sessionService"];
    function userService($timeout, sessionService) {
        var service = {
            info: {
                name: "",
                email: "",
                pass: "",
                err: ""
            },
            signup: signup,
            signin: signin,
            logout: logout
        };

        return service;

        function signup(name, email, pass) {
            service.info.name = name;
            service.info.email = email;
            service.info.pass = pass;

            sessionService.createAccount(name, email, pass, function (err) {
                if (err) {
                    $timeout(function () {
                        service.info.err = err.message;
                    });
                }
            });
        }

        function signin(email, pass) {
            service.info.email = email;
            service.info.pass = pass;

            sessionService.login(email, pass, function (err) {
                if (err) {
                    $timeout(function () {
                        service.info.err = err.message;
                    });
                }
            });
        }

        function logout() {
            service.info = {
                name: "",
                email: "",
                pass: "",
                err: ""
            };

            sessionService.logout();
        }

    }
}());
