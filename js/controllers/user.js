
myApp.modules.umControllers.controller('UserController', ["$window", "$scope", "$location", "$http", "$routeParams", "appSettings", "goToPage", function ($window, $scope, $location, $http, $routeParams, appSettings, goToPage) {
    "use strict";

    var action = $routeParams.action;
    $scope.user = {}; // contains all the form information about the user

    // set the right message for the submit button and fetch the user info if action is edit
    if (action === "edit") {
        $scope.submitButtonMessage = "Edit";

        $http.get(appSettings.firebaseConnection + "users/" + $routeParams.userId + ".json").
            success(function (data) {

                $scope.user = data;

            }).
            error(function () {

                alert("Error !!!");

            });

    }
    else {
        $scope.submitButtonMessage = "Add";
    }

    /**
     * saveUser() - method is triggered by the submit button to send the user data to the server
     */
    $scope.saveUser = function () {

        if (action === "edit") {

            $http.put(appSettings.firebaseConnection + "users/" + $routeParams.userId + ".json", $scope.user).
                success(function (data) {

                    $location.path(appSettings.serverPath);

                }).
                error(function () {

                    $window.alert("Error !!!");

                });

        }
        else {

            $http.post(appSettings.firebaseConnection + "users.json", $scope.user).
                success(function () {

                    $location.path(appSettings.serverPath);

                }).
                error(function () {

                    $window.alert("Error !!!");

                });
        }

    };

    /**
     * goToPage() method is triggered by the "back" button to change the page
     * @param page
     */
    $scope.goToPage = function (page) {
        goToPage.go(page);
    };

}]);