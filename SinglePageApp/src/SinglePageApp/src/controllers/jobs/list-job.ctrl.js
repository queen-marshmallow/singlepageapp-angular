
ngm('app').controller('listJobCtrl', ['$scope', 'jobSvc', 'listUtilSvc', function ($scope, jobSvc, listUtilSvc) {
    

    $scope.initialize = function () {        
        jobSvc.getAllJobs().then(function (jobs) {
            $scope.groupedJobs = listUtilSvc.groupBy(function(job) {
                return job ? job.Organization ? job.Organization.Name : '' : '';
            }, jobs);
        }).finally(function () {
            $scope.isLoaded = true;
        });
    }
}]);
