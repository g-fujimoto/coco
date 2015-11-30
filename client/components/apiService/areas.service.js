angular.module('webApp')
    .service('$Areas', ['$resource', function($resource) {
        this.Areas = $resource(
            '/api/areas',
            {_id: '@_id'},
            {update: {method: 'PUT'}}
        );
        return this.Areas;
    }]);
