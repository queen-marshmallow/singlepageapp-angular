ngm('app').factory('staticDataSvc', ['$resource', '$q', 'cacheSvc', function ($resource, $q, cacheSvc) {
        var orgCacheKey = 'staticOrganizations_Key';
        var roleCacheKey = 'staticRoles_Key';

        return {
            getOrganizations: function() {
                var defer = $q.defer();

                var cached = cacheSvc.get(orgCacheKey);
                if (cached != null) {
                    defer.resolve(cached);
                }

                $resource('api/organizations/').query({}, null, function (data) {
                    cacheSvc.put(orgCacheKey, data);
                    defer.resolve(data);
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            },
            getRoles: function () {
                var defer = $q.defer();

                var cached = cacheSvc.get(roleCacheKey);
                if (cached != null) {
                    defer.resolve(cached);
                }

                $resource('api/roles/').query({}, null, function (data) {
                    cacheSvc.put(roleCacheKey, data);
                    defer.resolve(data);
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            },
            getStates: function () {
                return [
                    'Alabama',
                    'Alaska',
                    'Arizona',
                    'Arkansas',
                    'California',
                    'Colorado',
                    'Connecticut',
                    'Delaware',
                    'Florida',
                    'Georgia',
                    'Hawaii',
                    'Idaho',
                    'Illinois',
                    'Indiana',
                    'Iowa',
                    'Kansas',
                    'Kentucky',
                    'Louisiana',
                    'Maine',
                    'Maryland',
                    'Massachusetts',
                    'Michigan',
                    'Minnesota',
                    'Mississipi',
                    'Missouri',
                    'Montana',
                    'Nebraska',
                    'Nevada',
                    'New Hampshire',
                    'New Jersey',
                    'New Mexico',
                    'New York',
                    'North Carolina',
                    'North Dakota',
                    'Ohio',
                    'Oklahoma',
                    'Oregon',
                    'Pennsylvania',
                    'Rhode Island',
                    'South Carolina',
                    'South Dakota',
                    'Tennessee',
                    'Texas',
                    'Utah',
                    'Vermont',
                    'Virginia',
                    'Washington',
                    'West Virginia',
                    'Wisconsin',
                    'Wyoming'
                ];
            },
            clearCache: function () {
                cacheSvc.remove(orgCacheKey);
                cacheSvc.remove(roleCacheKey);
            }
        }
}]);