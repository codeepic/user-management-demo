
myApp.modules.umControllers.controller('UsersListController', ["$window", "$scope", "$location", "$http", "appSettings", "goToPage", function ($window, $scope, $location, $http, appSettings, goToPage) {
    "use strict";

    // get the user list
    $http.get(appSettings.firebaseConnection + "users.json").
        success(function (data) {

            $scope.usersList = data;

        }).
        error(function () {

            $window.alert("Error !!!");

        });

    /**
     * goToPage() method is triggered by the "add user" button to change the page
     * @param page
     */
    $scope.goToPage = function (page) {

        goToPage.go(page);

    };

    // listen to an event emitted from "userActions" directive
    $scope.$on("userAction:removeUser", function (event, msg) {

        delete $scope.usersList[msg.userId];

    });

}]);