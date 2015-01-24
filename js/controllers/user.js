
myApp.modules.umControllers.controller('UserController', ["$scope", "$location", "$http", "$routeParams", "appSettings", function ($scope, $location, $http, $routeParams, appSettings) {
    "use strict";

    var action = $routeParams.action;
    $scope.user = {}; // contains all the form information about the user

    if (action === "edit") {
        $scope.submitButtonMessage = "Edit";
    }
    else {
        $scope.submitButtonMessage = "Add";
    }

    if (action === "edit") {

        $http.get(appSettings.firebaseConnection + "users/" + $routeParams.userId + ".json").
            success(function (data) {

                $scope.user = data;

            }).
            error(function () {

                alert("Error !!!");

            });
    }

    $scope.saveUser = function () {

        if (action === "edit") {

            $http.put(appSettings.firebaseConnection + "users/" + $routeParams.userId + ".json", $scope.user).
                success(function (data) {

                    $location.path(appSettings.serverPath);

                }).
                error(function () {

                    alert("Error !!!");

                });

        }
        else {

            $http.post(appSettings.firebaseConnection + "users.json", $scope.user).
                success(function () {

                    $location.path(appSettings.serverPath);

                }).
                error(function () {

                    alert("Error !!!");

                });
        }

    };

}]);