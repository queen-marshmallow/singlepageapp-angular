define([], function () {
    function appCache($cacheFactory) {
        return $cacheFactory('app-cache');
    }
    appCache.$inject = ['$cacheFactory'];

    return appCache;
});