angular.module('webApp')
    .service('$Users', ['$resource', ($resource) => {
        this.Users = $resource(
            '/api/users/:_id',
            {_id: '@_id'},
            {update: {method: 'PUT'}}
        );
        return this.Users;
    }]);
