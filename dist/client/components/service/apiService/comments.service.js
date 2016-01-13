'use strict';

angular.module('webApp').service('$Comments', ['$resource', '$http', function ($resource, $http) {
    this.Comments = $resource('/api/comments/:_id', { _id: '@_id' }, { update: { method: 'PUT' } });

    this.Comments.went_items = function (items) {
        var data = {};
        data.item = items;
        return $http.post('/api/comments/went_items', JSON.stringify(data));
    };

    this.Comments.itemComments = function (itemId) {
        var item = {
            _id: itemId
        };
        return $http.post('/api/comments/itemComments', item);
    };

    this.Comments.like = function (itemComment) {
        return $http.post('/api/like/add', itemComment);
    };

    return this.Comments;
}]);
