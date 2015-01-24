
describe("UsersListController", function () {
    var ctrl;
    var $rootScope;
    var $scope;
    var $window;
    var $location;
    var $httpBackend;
    var appSettings;
    var goToPage;

    beforeEach(function () {
        module("um");

        module(function ($provide) {
            $provide.value("goToPage", {
                go: function(page) {}
            });
        });

        inject(function (_$controller_, _$rootScope_, _$window_, _$location_, _$httpBackend_, _appSettings_, _goToPage_) {
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $window = _$window_;
            $location = _$location_;
            $httpBackend = _$httpBackend_;
            appSettings = _appSettings_;
            goToPage = _goToPage_;

            ctrl = _$controller_('UsersListController', {
                $window: $window,
                $scope: $scope,
                $location: $location,
                goToPage: goToPage
            });

        });
    });

    it("should load the users - success", function () {
        var usersData = {
            "a": {
                firstName: "test1",
                firstName: "test2"
            },
            "b": {
                firstName: "test3",
                firstName: "test4"
            }
        };
        expect($scope.usersList).toBeUndefined();
        $httpBackend.expect("GET", appSettings.firebaseConnection + "users.json").respond(usersData);
        $httpBackend.flush();
        expect(JSON.stringify($scope.usersList)).toBe(JSON.stringify(usersData));
    });

    it("should load the users - error", function () {
        spyOn($window, "alert");
        expect($scope.usersList).toBeUndefined();
        $httpBackend.expect("GET", appSettings.firebaseConnection + "users.json").respond(500);
        $httpBackend.flush();
        expect($scope.usersList).toBeUndefined();
        expect($window.alert).toHaveBeenCalledWith("Error !!!");
    });

    it("should go to a different page", function () {
        spyOn(goToPage, "go").and.callThrough();
        $scope.goToPage("test-page");
        expect(goToPage.go).toHaveBeenCalledWith("test-page");
    });

    it("should update the user list when a user is deleted", function () {
        $scope.usersList = {
            "1": "a",
            "2": "b"
        }
        expect(JSON.stringify($scope.usersList)).toBe(JSON.stringify({"1": "a", "2": "b"}));
        $rootScope.$broadcast("userAction:removeUser", {userId: 1});
        expect(JSON.stringify($scope.usersList)).toBe(JSON.stringify({"2": "b"}));
    });

});
