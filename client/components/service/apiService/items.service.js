angular.module('webApp')
    .service('$Items', ['$resource', '$http', '$rootScope', ($resource, $http, $rootScope) => {
        this.Items = $resource(
            '/api/items/:_id',
            {_id: '@_id'},
            {update: {method: 'PUT'}}
        );

        this.Items.getRecommend =  (data) => {
            $http.post(
                '/api/items/getRecommend',
                data
            )
            .success((data) => {
                console.log(data);
            }) ;
        };



        return this.Items;
    }]);
