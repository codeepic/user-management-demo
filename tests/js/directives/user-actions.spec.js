describe("userActions directive", function () {
    var $rootScope;
    var $compile;
    var $scope;
    var $location;
    var $httpBackend;
    var $window;
    var appSettings;
    var elem;

    beforeEach(function () {
        module("um");
        module("templates/directives/user-actions.html");

        module(function($provide) {
            $provide.value('$window', {alert: function () {}});
        });

        inject(function (_$rootScope_, _$compile_, _$location_, _$httpBackend_, _$window_, _appSettings_) {
            $rootScope = _$rootScope_;
            $compile = _$compile_;
            $location = _$location_;
            $httpBackend = _$httpBackend_;
            $window = _$window_;
            $scope = $rootScope.$new();
            appSettings = _appSettings_;
            $scope.userId = "123";
            var html = '<user-actions user-id="userId"></user-actions>';
            elem = $compile(html)($scope);
            $scope.$digest();
        });

    });

    it("should compile the directive", function () {
        expect(elem.isolateScope().userId).toBe("123");
    });

    it("should trigger remove user - success", function () {
        spyOn(elem.isolateScope(), "$emit");
        elem.isolateScope().removeUser();
        $httpBackend.expect("DELETE", appSettings.firebaseConnection + "users/123.json").respond(200);
        $httpBackend.flush();
        expect(elem.isolateScope().$emit).toHaveBeenCalledWith("userAction:removeUser", {userId: "123"});
    });

    it("should trigger remove user - fail", function () {
        spyOn($window, "alert");
        elem.isolateScope().removeUser();
        $httpBackend.expect("DELETE", appSettings.firebaseConnection + "users/123.json").respond(400);
        $httpBackend.flush();
        expect($window.alert).toHaveBeenCalledWith("Error !!!");
    });

    it("should trigger edit user", function () {
        spyOn($location, "path");
        elem.isolateScope().editUser();
        expect($location.path).toHaveBeenCalledWith("/user-management-demo/user/edit/123");
    });

});