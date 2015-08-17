
ngm('app').controller('listJobCtrl', ['$scope', 'jobSvc', function ($scope, jobSvc) {
    

    $scope.initialize = function () {        
        jobSvc.getAllJobs().then(function (jobs) {
            $scope.jobs = jobs;
        }).finally(function () {
            $scope.isLoaded = true;
        });
    }
}]);
