////
//// test/e2e/routesSpec.js
////
//describe("E2E: Testing Routes", function() {
//
//    beforeEach(function() {
//        browser().navigateTo('/');
//    });
//
//    it('should jump to the /login path when / is accessed', function() {
//        browser().navigateTo('/');
//        expect(browser().location().path()).toBe("/login");
//    });
//
//    it('should return error with wrong login details', function() {
//        browser().navigateTo('/');
//        input("user.username").enter("test");
//        input("user.password").enter("123");
//        element("button").click();
//        expect(browser().location().path()).toBe("/login");
//    });
//
//    it('should login and redirect to videos', function() {
//        browser().navigateTo('/');
//        input("user.username").enter("ali");
//        input("user.password").enter("password");
//        element("button").click();
//        expect(browser().location().path()).toBe("/videos");
//    });
//});