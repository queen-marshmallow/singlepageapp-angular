
define(['angular', 'angular-route', 'angular-resource', 'app/common/config', 'app/models/welcome-controller',
'app/models/jobs/create-controller', 'app/services/jobs-data-service'],

    function (angular, route, resource, config, welcomeController, jobCreateController, jobsDataService) {
    'use strict';

        var app = angular.module('jobSearchApp', ['ngRoute', 'ngResource']);

        app.config(config);
        app.factory('jobsDataService', jobsDataService);
        app.controller('welcomeController', welcomeController);
        app.controller('jobCreateController', jobCreateController);
});