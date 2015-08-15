define([], function () {
    function config($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/app/views/page-welcome.html',
                controller: 'welcomeController'
            })
            .when('/jobs/create', {
                templateUrl: '/app/views/jobs/page-create.html',
                controller: 'jobCreateController'
            });
    }

    config.$inject = ['$routeProvider'];

    return config;
    
});