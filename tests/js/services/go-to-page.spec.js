describe("goToPage service", function () {
    var $location;
    var goToPage;

    beforeEach(function () {
        module("um");

        inject(function (_$location_, _goToPage_) {
            $location = _$location_;
            goToPage = _goToPage_;
        });

    });

    it("should trigger the go method", function () {
        spyOn($location, "path");
        goToPage.go("user/add");
        expect($location.path).toHaveBeenCalledWith("/user-management-demo/user/add");
    });

});