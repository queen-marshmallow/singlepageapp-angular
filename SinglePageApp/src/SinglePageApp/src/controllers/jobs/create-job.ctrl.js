﻿ngm('app').controller('createJobCtrl', ['$scope', '$q', 'jobSvc', 'staticDataSvc', function ($scope, $q, jobSvc, staticDataSvc) {
    $scope.initialize = function () {
        $scope.isLoaded = false;

        var orgRequest = staticDataSvc.getOrganizations();
        orgRequest.then(function (orgs) {
            $scope.organizations = orgs;
        });

        var roleRequest = staticDataSvc.getRoles();
        roleRequest.then(function (roles) {
            $scope.roles = roles;
        });

        $q.all([orgRequest, roleRequest]).finally(function () {
            $scope.isLoaded = true;
        });

        $scope.states = staticDataSvc.getStates();

        $scope.submit = function submit() {
            var job = {
                Description: $scope.description,
                PositionType: $scope.selectedRole,
                State: $scope.selectedState,
                City: $scope.city,
                Location: $scope.selectedLocation,
                Organization: $scope.selectedOrganization
            }

            //todo: handle errors
            jobSvc.createJob(job).then(function () {
                //todo: redirect to job list page
                window.location.replace(window.location.protocol + '//' + window.location.host);
            });
        }
    }
}]);