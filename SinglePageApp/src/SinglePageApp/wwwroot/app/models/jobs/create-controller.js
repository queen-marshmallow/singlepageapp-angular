define([], function () {
    function jobCreateController($scope, jobsDataService) {

        function _submit() {
            var job = {
                Description: $scope.description,
                PositionType: $scope.selectedRole,
                Location: $scope.selectedLocation,
                Organization: $scope.selectedOrganization
            }
        }

        return {
            submit: _submit
        }
    }

    jobCreateController.$inject = ['$scope', 'jobsDataService'];

    return jobCreateController;
});