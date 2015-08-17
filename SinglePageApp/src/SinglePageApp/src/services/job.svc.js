ngm('app').factory('jobSvc', ['$resource', '$q', function($resource, $q) {
    return {
        getAllJobs: function () {
            var defer = $q.defer();

            $resource('api/jobs/').query({}, null, function (data) {
                defer.resolve(data);
            }, function (error) {
                defer.reject(error);
            });
            return defer.promise;
        },
        createJob: function(job) {
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
    }
}]);