define([], function () {
    function staticDataService($resource, $q, appCache) {
        var orgCacheKey = 'staticOrganizations_Key';
        var roleCacheKey = 'staticRoles_Key';

        function _getOrganizations() {
            var defer = $q.defer();

            var cached = appCache.get(orgCacheKey);
            if (cached != null) {
                defer.resolve(cached);
            }

            $resource('api/organizations/').query({}, null, function (data) {
                appCache.put(orgCacheKey, data);
                defer.resolve(data);
            }, function (error) {
                defer.reject(error);
            });
            return defer.promise;
        }

        function _getRoles() {
            var defer = $q.defer();

            var cached = appCache.get(roleCacheKey);
            if (cached != null) {
                defer.resolve(cached);
            }

            $resource('api/roles/').query({}, null, function (data) {
                appCache.put(roleCacheKey, data);
                defer.resolve(data);
            }, function (error) {
                defer.reject(error);
            });
            return defer.promise;
        }

        function _getStates() {
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
        }

        function _clearCache() {
            appCache.remove(orgCacheKey);
            appCache.remove(roleCacheKey);
        }


        return {
            getOrganizations: _getOrganizations,
            getRoles: _getRoles,
            getStates: _getStates,
            clearCache: _clearCache
        }
    };

    staticDataService.$inject = ['$resource', '$q', 'appCache'];

    return staticDataService;
});