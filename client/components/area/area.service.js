angular.module('webApp')
    .service('$AreaService', ['$http', function($http) {

        /**
         * Area データ全件出力
         */
        this.findAll = function(scope) {

            $http.get('/api/area')
                .success(function(data) {
                    scope.area = data;
                });
        };

    }]);
