
myApp.modules.umServices.factory("goToPage", ["$location", "appSettings", function ($location, appSettings) {
    "use strict";

    return {

        go: function (page) {

            $location.path(appSettings.serverPath + page);

        }

    }

}]);