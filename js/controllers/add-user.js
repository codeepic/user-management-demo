
myApp.modules.umControllers.controller('AddUserController', ["$scope", "$location", "$http", "appSettings", function ($scope, $location, $http, appSettings) {
    "use strict";

    $scope.user = {}; // contains all the form information about the user

    $scope.saveUser = function () {

        $http.post(appSettings.firebaseConnection + "users.json", $scope.user).
            success(function () {

                $location.path(appSettings.serverPath);

            }).
            error(function () {

                alert("Error !!!");

            });

    };

}]);