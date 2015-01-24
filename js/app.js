
// um = user management

myApp.modules.um = angular.module("um", [
    "ngRoute",

    "um.controllers",
    "um.services",
    //"um.directives"
]);

myApp.modules.um.config(["$routeProvider", "$locationProvider", "appSettings", function ($routeProvider, $locationProvider, appSettings) {

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    }).hashPrefix('!');

    console.log("TEST", appSettings.serverPath + "add-user");

    $routeProvider.when(appSettings.serverPath + "add-user", {templateUrl: 'templates/views/add-user.html', controller: 'AddUserController'});

    $routeProvider.otherwise({templateUrl: 'templates/views/users-list.html', controller: 'UsersListController'});

}]);