describe('IndexController', function () {

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

        $sessionStorage.sessionId = "aJPzz1TmafSO8ZNo7psgRBAiPLcSD0x6";

        // Mock API
        $httpBackend.when("GET", "/videos?skip=0&sessionId=aJPzz1TmafSO8ZNo7psgRBAiPLcSD0x6")
            .respond(function(method, url, data, headers, params) {
                return [
                        200, {
                            "status": "success",
                            "data": [
                                {
                                    "_id": "57611a0fb5399cb9df0b2fc8",
                                    "name": "[10] iPhone 7 Trailer 2016",
                                    "description": "iPhone 7 concept trailer 2016! with Bluetooth AirPods by Beats and ChargingPad, and much more!",
                                    "url": "videos/iPhone_7_Trailer_2016.mp4",
                                    "__v": 12,
                                    "ratings": [
                                        4,
                                        3,
                                        4,
                                        3,
                                        4,
                                    ]
                                },
                                {
                                    "_id": "57611a0fb5399cb9df0b2fc9",
                                    "name": "[11] What is the MEAN Stack",
                                    "description": "Do you know what the MEAN stack is? Watch our short intro video and get ready to kick your learning into shape with this full-stack development toolkit. Then head on over and play through our MEAN-related courses now.",
                                    "url": "videos/What_is_the_MEAN_Stack.mp4",
                                    "ratings": [
                                        1,
                                        5,
                                        5,
                                        5,
                                        3,
                                        4,
                                        5,
                                        5
                                    ]
                                },
                                {
                                    "_id": "57611a0fb5399cb9df0b2fca",
                                    "name": "[12] Getting Started With ReactJs",
                                    "description": "React.js is a JavaScript library for building user interfaces. - Just the UI: Lots of people use React as the V in MVC. Since React makes no assumptions about the rest of your technology stack, its easy to try it out on a small feature in an existing project. - Virtual DOM: React uses a virtual DOM diff implementation for ultra-high performance. It can also render on the server using Node.js — no heavy browser DOM required. - Data flow: React implements one-way reactive data flow which reduces boilerplate and is easier to reason about than traditional data binding.",
                                    "url": "videos/Getting_Started_With_React.js.mp4",
                                    "ratings": [
                                        1,
                                        5,
                                        5,
                                        4,
                                        3,
                                        4,
                                        2,
                                        5
                                    ]
                                },
                                {
                                    "_id": "57611a0fb5399cb9df0b2fcb",
                                    "name": "[13] Google Cardboard Assembly",
                                    "description": "Google Cardboard Assembly Step by Step Instructions [HD]",
                                    "url": "videos/Google_Cardboard_Assembly.mp4",
                                    "ratings": [
                                        4,
                                        5,
                                        5,
                                        5,
                                        3,
                                        5,
                                        4,
                                        5
                                    ]
                                },
                                {
                                    "_id": "57611a0fb5399cb9df0b2fcc",
                                    "name": "[14] How Does AngularJS Work Beginners Angular Tutorial",
                                    "description": "What you will learn in this course. How to use Angular.js to save time, create better projects and give your users a better experience. We’ll create a full SPA from scratch (client side). How to cloud-enable your SPA so that you can connect it to any kind of backend. Fully commented source code of the course project. Learn how to architecture a SPA: modules, controllers, services Learn how to add URL routes to your client-side SPA. We’ll be using Angular.js version 1.3.2. Access live examples at the end of each coding lesson. Learn how to use other great tools such as Boostrap 3, UnderscoreJS and Google Chrome’s Developer Tools!",
                                    "url": "videos/How_Does_AngularJS_Work_Beginners_Angular_Tutorial.mp4",
                                    "ratings": [
                                        2,
                                        4,
                                        2,
                                        2,
                                        3,
                                        1,
                                        2,
                                        5
                                    ]
                                },
                                {
                                    "_id": "57611a0fb5399cb9df0b2fcd",
                                    "name": "[15] How does Node.js work",
                                    "description": "New to Node.js? Check out this video that explains \"How does Node work?\"",
                                    "url": "videos/How_does_Node.js_work.mp4",
                                    "ratings": [
                                        3,
                                        3,
                                        3,
                                        3,
                                        3,
                                        3,
                                        3,
                                        3
                                    ]
                                },
                                {
                                    "_id": "57611a0fb5399cb9df0b2fce",
                                    "name": "[16] iPhone 7 Trailer 2016",
                                    "description": "iPhone 7 concept trailer 2016! with Bluetooth AirPods by Beats and ChargingPad, and much more!",
                                    "url": "videos/iPhone_7_Trailer_2016.mp4",
                                    "ratings": [
                                        4,
                                        3,
                                        4,
                                        3,
                                        4,
                                        3,
                                        4,
                                        3
                                    ]
                                },
                                {
                                    "_id": "57611a0fb5399cb9df0b2fcf",
                                    "name": "[17] What is the MEAN Stack",
                                    "description": "Do you know what the MEAN stack is? Watch our short intro video and get ready to kick your learning into shape with this full-stack development toolkit. Then head on over and play through our MEAN-related courses now.",
                                    "url": "videos/What_is_the_MEAN_Stack.mp4",
                                    "ratings": [
                                        1,
                                        5,
                                        5,
                                        5,
                                        3,
                                        4,
                                        5,
                                        5
                                    ]
                                },
                                {
                                    "_id": "57611a0fb5399cb9df0b2fd0",
                                    "name": "[18] Getting Started With ReactJs",
                                    "description": "React.js is a JavaScript library for building user interfaces. - Just the UI: Lots of people use React as the V in MVC. Since React makes no assumptions about the rest of your technology stack, its easy to try it out on a small feature in an existing project. - Virtual DOM: React uses a virtual DOM diff implementation for ultra-high performance. It can also render on the server using Node.js — no heavy browser DOM required. - Data flow: React implements one-way reactive data flow which reduces boilerplate and is easier to reason about than traditional data binding.",
                                    "url": "videos/Getting_Started_With_React.js.mp4",
                                    "ratings": [
                                        1,
                                        5,
                                        5,
                                        4,
                                        3,
                                        4,
                                        2,
                                        5
                                    ]
                                },
                                {
                                    "_id": "57611a0fb5399cb9df0b2fd1",
                                    "name": "[19] Google Cardboard Assembly",
                                    "description": "Google Cardboard Assembly Step by Step Instructions [HD]",
                                    "url": "videos/Google_Cardboard_Assembly.mp4",
                                    "ratings": [
                                        4,
                                        5,
                                        5,
                                        5,
                                        3,
                                        5,
                                        4,
                                        5
                                    ]
                                }
                            ]
                        }
                    ]
            });

        $httpBackend.when("GET", /\/templates\/.*/).respond(200);

        $scope = $rootScope.$new();

        $httpBackend.expect("GET", "/videos?skip=0&sessionId=aJPzz1TmafSO8ZNo7psgRBAiPLcSD0x6");

        controller = $controller('IndexController', {
            $scope: $scope
        });
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should fetch videos', function () {
        $scope.skip = 0;
        $scope.reachedEnd = false;
        $sessionStorage.sessionId = "aJPzz1TmafSO8ZNo7psgRBAiPLcSD0x6";

        $scope.paginate();

        $httpBackend.expect("GET", "/videos?skip=0&sessionId=aJPzz1TmafSO8ZNo7psgRBAiPLcSD0x6");

        $httpBackend.flush();
    });

});