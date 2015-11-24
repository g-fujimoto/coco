angular.module('webApp')
    .service('$ItemsService', ['$http', function($http) {
        /**
         * Items データ全件出力
         * @author [author]
         * @param  {[type]} scope [description]
         * @return {[type]}       [description]
         */
        this.findAll = function(scope) {
            $http.get('/api/admin/items')
                .success(function(data) {
                    scope.items = data;
                });
        };

        /**
         * Items データ登録
         * @author [author]
         * @param  {[type]} scope    [description]
         * @param  {[type]} postData [description]
         * @return {[type]}          [description]
         */
        this.save = function(scope, postData) {
            $http.post('/api/admin/items', postData)
                .success(function(data) {
                    if(data === 'error') {
                        console.log('エラーだよ');
                    } else {
                        scope.items.push(data);
                    }
                });
        };
}]);
