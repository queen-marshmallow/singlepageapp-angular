
define(['angular', 'angular-route', 'angular-resource', 'app/common/config', 'app/common/cache', 'app/models/welcome-controller',
'app/models/jobs/create-controller', 'app/services/jobs-data-service',  'app/services/static-data-service'],

    function (angular, route, resource, config, cache, welcomeController, jobCreateController, jobsDataService, staticDataService) {
    'use strict';

        var app = angular.module('jobSearchApp', ['ngRoute', 'ngResource']);

        app.config(config);
        app.factory('appCache', cache);
        app.factory('jobsDataService', jobsDataService);
        app.factory('staticDataService', staticDataService);
        app.controller('welcomeController', welcomeController);
        app.controller('jobCreateController', jobCreateController);
});