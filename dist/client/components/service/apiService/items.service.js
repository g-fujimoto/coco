'use strict';

angular.module('webApp').service('$Items', ['$resource', '$http', '$rootScope', function ($resource, $http, $rootScope) {
    this.Items = $resource('/api/items/:_id', { _id: '@_id' }, { update: { method: 'PUT' } });

    this.Items.getRecommend = function (data) {
        $http.post('/api/items/getRecommend', data).success(function (data) {
            console.log(data);
        });
    };

    this.Items.fiximage = function (data) {
        $http.post('/api/items/fiximage', data).success(function (data) {
            console.log(data);
        });
    };

    return this.Items;
}]);
