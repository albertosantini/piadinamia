"use strict";

(function () {
    angular
        .module("piadinamia")
        .factory("userService", userService);


    userService.$inject = ["sessionService"];

    function userService(sessionService) {
        var service = {
            isSigningUp: false,
            isSigningIn: false,
            isLogged: false,
            info: {
                name: "",
                email: "",
                pass: "",
                err: ""
            },
            home: home,
            signup: signup,
            signin: signin,
            logout: logout
        };

        return service;

        function home() {
            service.isSigningUp = false;
            service.isSigningIn = false;
        }

        function signup() {
            if (!service.isLogged) {
                service.isSigningUp = true;
                service.isSigningIn = false;
            }
        }

        function signin() {
            if (!service.isLogged) {
                service.isSigningUp = false;
                service.isSigningIn = true;
            }

            if (service.info.email && service.info.pass) {
                sessionService.login(service.info.email, service.info.pass,
                    function (err) {
                        if (!err) {
                            service.isLogged = true;
                            service.home();
                        } else {
                            service.info.err = err.message;
                        }
                    });
            }
        }

        function logout() {
            service.info = {
                name: "",
                email: "",
                pass: "",
                err: ""
            };

            service.isLogged = false;

            sessionService.logout();
        }

    }
}());
