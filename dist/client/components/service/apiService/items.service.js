'use strict';

angular.module('webApp').service('$Items', ['$resource', '$http', '$rootScope', function ($resource, $http, $rootScope) {
    undefined.Items = $resource('/api/items/:_id', { _id: '@_id' }, { update: { method: 'PUT' } });

    undefined.Items.getRecommend = function (data) {
        $http.post('/api/items/getRecommend', data).success(function (data) {
            console.log(data);
        });
    };

    undefined.Items.fiximage = function (data) {
        $http.post('/api/items/fiximage', data).success(function (data) {
            console.log(data);
        });
    };

    return undefined.Items;
}]);