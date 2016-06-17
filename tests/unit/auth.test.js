describe('AuthController', function () {

    var controller = null;
    var $scope = null;
    var $httpBackend = null;
    var $sessionStorage = null;

    beforeEach(function () {
        module('app');
    });

    beforeEach(inject(function (_$controller_, $rootScope, _$httpBackend_, _$sessionStorage_) {
        $controller = _$controller_;
        $httpBackend = _$httpBackend_;
        $sessionStorage = _$sessionStorage_;

        // Mock API
        $httpBackend.when("POST", /\/user\/auth(\?sessionId=[0-9A-Za-z]*|)/)
            .respond(function(method, url, data, headers, params) {
                data = JSON.parse(data);

                if (data.username  == "ali" && data.password == "5f4dcc3b5aa765d61d8327deb882cf99") {
                    // We received correct credentials
                    return [200, {
                        "status": "success",
                        "sessionId": "nKP1dLp5RALCPvZobZW4oXFWvdY6wIqB",
                        "username": "ali"
                    }];
                }
                else {
                    // We received wrong credentials
                    return [
                        200, {
                            "status": "error",
                            "error": "Invalid username or password"
                        }
                    ]
                }
            });

        $httpBackend.when("GET", /\/templates\/.*/).respond(200);

        $scope = $rootScope.$new();
        controller = $controller('AuthController', {
            $scope: $scope
        });
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    it('should not login with wrong credentials', function () {
        $scope.user = {
            "username": "wrong",
            "password": md5("wrong")
        };

        $scope.login();

        $httpBackend.expect("POST", "/user/auth", $scope.user);
        $httpBackend.flush();
    });

    it('should login with correct credentials', function () {
        $scope.user = {
            "username": "ali",
            "password": "password"
        };

        $scope.login();

        $httpBackend.expect("POST", "/user/auth", $scope.user);
        $httpBackend.flush();

        expect($sessionStorage.sessionId).not.toBe(undefined);
    });

});