define([], function () {
    function jobCreateController($scope, jobsDataService, staticDataService) {

        staticDataService.getOrganizations().then(function (orgs) {
            $scope.organizations = orgs;
        });

        staticDataService.getRoles().then(function (roles) {
            $scope.roles = roles;
        });

        $scope.states = staticDataService.getStates();

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
            jobsDataService.createJob(job).then(function () {
                //todo: redirect to job list page
                window.location.replace(window.location.protocol + '//' + window.location.host);
            });
        }
    }

    jobCreateController.$inject = ['$scope', 'jobsDataService', 'staticDataService'];

    return jobCreateController;
});