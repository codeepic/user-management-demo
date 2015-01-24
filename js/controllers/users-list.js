
myApp.modules.umControllers.controller('UsersListController', ["$scope", "$location", "$http", "appSettings", function ($scope, $location, $http, appSettings) {
    "use strict";

    $scope.noUsers = false;

    $http.get(appSettings.firebaseConnection + "users.json").
        success(function (data) {

            $scope.usersList = data;

        }).
        error(function () {

            alert("Error !!!");

        });


    $scope.goToPage = function (page) {
        $location.path(appSettings.serverPath + page);
    };

    $scope.$on("userAction:removeUser", function (event, msg) {
        delete $scope.usersList[msg.userId];
    });

}]);