
// um = user management

myApp.modules.um = angular.module("um", [
    "ngRoute",

    "um.controllers",
    "um.services",
    "um.directives"
]);

myApp.modules.um.config(["$routeProvider", "$locationProvider", "appSettings", function ($routeProvider, $locationProvider, appSettings) {

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider.when(appSettings.serverPath + "user/:action/:userId?",
        {
            templateUrl: appSettings.serverPath + "templates/views/user.html",
            controller: "UserController"
        }
    );
    $routeProvider.otherwise(
        {
            templateUrl: appSettings.serverPath + "templates/views/users-list.html",
            controller: "UsersListController"
        }
    );

}]);