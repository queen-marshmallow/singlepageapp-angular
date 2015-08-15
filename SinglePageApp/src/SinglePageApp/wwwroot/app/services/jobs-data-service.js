define([], function () {
    function jobsDataService($resource, $q) {
        function _getAllJobs() {
            var defer = $q.defer();

            $resource('api/jobs/').query({}, null, function (data) {
                defer.resolve(data);
            }, function (error) {
                defer.reject(error);
            });
            return defer.promise;
        }

        function _createJob(job) {
            var defer = $q.defer();

            $resource('api/jobs/').save({}, job,
                function () {
                    defer.resolve();
                },
                function (error) {
                    defer.reject(error);
                });
            return defer.promise;
        }

        return {
            getAllJobs: _getAllJobs
        }
    };

    jobsDataService.$inject = ['$resource', '$q'];

    return jobsDataService;
});