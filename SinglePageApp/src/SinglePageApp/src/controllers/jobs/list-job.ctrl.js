
ngm('app').controller('listJobCtrl', ['$scope', 'jobSvc', 'spinnerService', function ($scope, jobSvc, spinnerService) {
    $scope.initialize = function () {
        spinnerService.show('jobListSpinner');
        
        jobSvc.getAllJobs().then(function (jobs) {
            $scope.jobs = jobs;
        }).finally(function () {
            spinnerService.hide('jobListSpinner');
            $scope.isLoaded = true;
        });
    }
}]);
