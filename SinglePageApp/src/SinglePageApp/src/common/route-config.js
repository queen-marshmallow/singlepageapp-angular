
ngm('app').config(['$routeProvider', function ($routeProvider) {
    $routeProvider
           .when('/', {
               templateUrl: '/views/manager/dashboard.html',
               controller: 'landingCtrl'
           })
           .when('/jobs/create', {
               templateUrl: '/views/jobs/create-job.html',
               controller: 'createJobCtrl'
           })
           .when('/jobs/list', {
               templateUrl: '/views/jobs/list-job.html',
               controller: 'listJobCtrl'
           })
           .when('/manager/dashboard', {
               templateUrl: '/views/manager/dashboard.html'
           });
}]);