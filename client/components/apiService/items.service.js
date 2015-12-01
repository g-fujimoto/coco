angular.module('webApp')
    .service('$Items', ['$resource', ($resource) => {
        this.Items = $resource(
            '/api/items/:_id',
            {_id: '@_id'},
            {update: {method: 'PUT'}}
        );
        return this.Items;
    }]);
