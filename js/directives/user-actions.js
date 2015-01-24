
myApp.modules.umDirectives.directive('userActions', ["$http", "$location", "appSettings", function ($http, $location, appSettings) {
    'use strict';

    return {
        restrict: "E",
        replace: true,
        templateUrl: "templates/directives/user-actions.html",
        scope: {
            userId: "="
        },
        link: function (scope, elem) {

            scope.removeUser = function () {

                $http.delete(appSettings.firebaseConnection + "users/" + scope.userId + ".json").
                    success(function () {

                        scope.$emit("userAction:removeUser", {userId: scope.userId});

                    }).
                    error(function () {

                        alert("Error !!!");

                    });

            };

            scope.editUser = function () {

                $location.path(appSettings.serverPath + "user/edit/" + scope.userId);

            }

        }
    };

}]);
