'use strict';

angular.module('webApp').service('$Comments', ['$resource', '$http', function ($resource, $http) {
    undefined.Comments = $resource('/api/comments/:_id', { _id: '@_id' }, { update: { method: 'PUT' } });

    undefined.Comments.went_items = function (items) {
        var data = {};
        data.item = items;
        return $http.post('/api/comments/went_items', JSON.stringify(data));
    };

    undefined.Comments.itemComments = function (itemId) {
        var item = {
            _id: itemId
        };
        return $http.post('/api/comments/itemComments', item);
    };

    undefined.Comments.like = function (itemComment) {
        return $http.post('/api/like/add', itemComment);
    };

    return undefined.Comments;
}]);