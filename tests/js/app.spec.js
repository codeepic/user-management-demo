
describe("app config", function () {
    var $location;
    var $httpBackend;
    var $rootScope;
    var $route;

    beforeEach(function () {
        module('um');

        inject(function (_$location_, _$httpBackend_, _$rootScope_, _$route_) {
            $location = _$location_;
            $httpBackend = _$httpBackend_;
            $rootScope = _$rootScope_;
            $route = _$route_;
        });

    });

    it ("should check the config options", function () {
        expect($location.$$html5).toBe(true);
    });

    it("should trigger the users list route", function () {
        $location.path(myApp.serverPath);
        $httpBackend.expect("GET", myApp.serverPath + "templates/views/users-list.html").respond(200);
        $rootScope.$digest();
        expect($route.current.templateUrl).toBe(myApp.serverPath + "templates/views/users-list.html");
        expect($route.current.controller).toBe("UsersListController");
    });

    it("should trigger the user add/edit route", function () {
        $location.path(myApp.serverPath + "user/add");
        $httpBackend.expect("GET", myApp.serverPath + "templates/views/user.html").respond(200);
        $rootScope.$digest();
        expect($route.current.templateUrl).toBe(myApp.serverPath + "templates/views/user.html");
        expect($route.current.controller).toBe("UserController");
    });

});