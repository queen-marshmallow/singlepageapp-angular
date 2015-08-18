ngm('app').factory('listUtilSvc', [function () {
    return {
        groupBy: function(accessor, list) {
            var grouped = {};

            angular.forEach(list, function (item, key) {
                if (!grouped[accessor(item)]) {
                    grouped[accessor(item)] = [];
                }
                grouped[accessor(item)].push(item);
            });

            return grouped;
        }
    };
}]);