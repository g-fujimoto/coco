angular.module('webApp')
    .service('$Comments', ['$resource',  '$http', ($resource, $http) => {
        this.Comments = $resource(
            '/api/comments/:_id',
            {_id: '@_id'},
            {update: {method: 'PUT'}}
        );

        this.Comments.went_items = function(items) {
            var data = {};
            data.item = items;
            return $http.post('/api/comments/went_items', JSON.stringify(data));
        };

        this.Comments.itemComments = (itemId) => {
            var item = {
                _id: itemId
            };
            return $http.post('/api/comments/itemComments', item);
        };

        this.Comments.like = (itemComment) => {
            return $http.post('/api/like/add', itemComment);
        };

        return this.Comments;
    }]);
