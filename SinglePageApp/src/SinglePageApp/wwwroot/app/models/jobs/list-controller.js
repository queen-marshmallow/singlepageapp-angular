define([], function () {
    function jobListController($scope, jobsDataService) {

        jobsDataService.getAllJobs().then(function (jobs) {
            $scope.jobs = jobs;
        });
    }

    jobListController.$inject = ['$scope', 'jobsDataService'];

    return jobListController;
});