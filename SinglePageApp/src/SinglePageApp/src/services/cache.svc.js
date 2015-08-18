ngm('app').factory('cacheSvc', ['$cacheFactory', function ($cacheFactory) {
    return $cacheFactory('app-cache');
}]);