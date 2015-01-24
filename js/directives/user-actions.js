
myApp.modules.umDirectives.directive('userActions', ["$window", "$http", "$location", "appSettings", function ($window, $http, $location, appSettings) {
    'use strict';

    return {
        restrict: "E",
        replace: true,
        templateUrl: "templates/directives/user-actions.html",
        scope: {
            userId: "="
        },
        link: function (scope) {

            /**
             * removeUser() - method is triggered by the remove icon and deletes a user
             */
            scope.removeUser = function () {

                $http.delete(appSettings.firebaseConnection + "users/" + scope.userId + ".json").
                    success(function () {

                        scope.$emit("userAction:removeUser", {userId: scope.userId});

                    }).
                    error(function () {

                        $window.alert("Error !!!");

                    });

            };

            /**
             * editUser() - method is triggered by the edit icon and moves to the user/edit page
             */
            scope.editUser = function () {

                $location.path(appSettings.serverPath + "user/edit/" + scope.userId);

            }

        }
    };

}]);
