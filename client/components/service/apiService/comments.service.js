angular.module('webApp')
    .service('$Comments', ['$resource', ($resource) => {
        this.Comments = $resource(
            '/api/comments/:_id',
            {_id: '@_id'},
            {update: {method: 'PUT'}}
        );
        return this.Comments;
    }]);
