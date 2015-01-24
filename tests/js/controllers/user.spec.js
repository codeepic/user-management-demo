
describe("UserController", function () {
    var ctrl;
    var $rootScope;
    var $scope;
    var $window;
    var $location;
    var $controller;
    var $httpBackend;
    var appSettings;
    var goToPage;

    beforeEach(function () {
        module("um");

        module(function ($provide) {
            $provide.value("goToPage", {
                go: function() {}
            });
            $provide.value("$window", {
                alert: function () {}
            });
        });

        inject(function (_$controller_, _$rootScope_, _$window_, _$location_, _$httpBackend_, _appSettings_, _goToPage_) {
            $rootScope = _$rootScope_;
            $scope = $rootScope.$new();
            $window = _$window_;
            $location = _$location_;
            $controller = _$controller_;
            $httpBackend = _$httpBackend_;
            appSettings = _appSettings_;
            goToPage = _goToPage_;
        });
    });

    describe("user edit", function () {

        beforeEach(function () {
            inject(function () {
                ctrl = $controller('UserController', {
                    $window: $window,
                    $scope: $scope,
                    $routeParams: {
                        action: "edit",
                        userId: "1"
                    },
                    goToPage: goToPage
                });
            });
        });

        it("should get the user info - success", function () {
            var userData = {
                firstName: "test1"
            };
            expect(JSON.stringify($scope.user)).toBe(JSON.stringify({}));
            expect($scope.submitButtonMessage).toBe("Edit");
            $httpBackend.expect("GET", appSettings.firebaseConnection + "users/1.json").respond(userData);
            $httpBackend.flush();
            expect(JSON.stringify($scope.user)).toBe(JSON.stringify(userData));
        });

        it("should get the user info - error", function () {
            spyOn($window, "alert");
            expect($scope.submitButtonMessage).toBe("Edit");
            $httpBackend.expect("GET", appSettings.firebaseConnection + "users/1.json").respond(400);
            $httpBackend.flush();
            expect($window.alert).toHaveBeenCalledWith("Error !!!");
        });

        it("should save the user - success", function () {
            spyOn($location, "path");
            $scope.saveUser();
            $httpBackend.expect("GET", appSettings.firebaseConnection + "users/1.json").respond(200);
            $httpBackend.expect("PUT", appSettings.firebaseConnection + "users/1.json").respond(200);
            $httpBackend.flush();
            expect($location.path).toHaveBeenCalledWith("/user-management-demo/");
        });

        it("should save the user - error", function () {
            spyOn($window, "alert");
            $scope.saveUser();
            $httpBackend.expect("GET", appSettings.firebaseConnection + "users/1.json").respond(200);
            $httpBackend.expect("PUT", appSettings.firebaseConnection + "users/1.json").respond(400);
            $httpBackend.flush();
            expect($window.alert).toHaveBeenCalledWith("Error !!!");
        });
    });

    describe("user add", function () {

        beforeEach(function () {
            inject(function () {
                ctrl = $controller('UserController', {
                    $window: $window,
                    $scope: $scope,
                    $routeParams: {
                        action: "add"
                    },
                    goToPage: goToPage
                });
            });
        });

        it("should set the right button message", function () {
            expect($scope.submitButtonMessage).toBe("Add");
        });

        it("should save the user - success", function () {
            spyOn($location, "path");
            $scope.saveUser();
            $httpBackend.expect("POST", appSettings.firebaseConnection + "users.json").respond(200);
            $httpBackend.flush();
            expect($location.path).toHaveBeenCalledWith("/user-management-demo/");
        });

        it("should save the user - error", function () {
            spyOn($window, "alert");
            $scope.saveUser();
            $httpBackend.expect("POST", appSettings.firebaseConnection + "users.json").respond(400);
            $httpBackend.flush();
            expect($window.alert).toHaveBeenCalledWith("Error !!!");
        });
    });


    it("should go to a different page", function () {
        inject(function () {
            ctrl = $controller('UserController', {
                $window: $window,
                $scope: $scope,
                $routeParams: {
                    action: "add"
                },
                goToPage: goToPage
            });
        });
        spyOn(goToPage, "go").and.callThrough();
        $scope.goToPage("test-page");
        expect(goToPage.go).toHaveBeenCalledWith("test-page");
    });
});
