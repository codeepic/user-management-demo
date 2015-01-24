var myApp = {
    // will contain all the app modules
    serverPath: "/user-management-demo/",
    modules: {
        umControllers: angular.module("um.controllers", []),
        umServices: angular.module("um.services", []),
        umDirectives: angular.module("um.directives", [])
    }
};