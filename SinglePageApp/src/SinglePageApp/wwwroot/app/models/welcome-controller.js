define([], function () {
    function welcomeController($scope) {
        $scope.message = "Hello there!";
    }

    welcomeController.$inject = ['$scope'];

    return welcomeController;
});