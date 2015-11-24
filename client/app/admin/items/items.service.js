angular.module('webApp')
    .service('$ItemsService', ['$http', '$state', '$timeout', function($http, $state, $timeout) {
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
                        $state.go('items');
                    }
                });
        };

        /**
         * [function description]
         * @author [author]
         * @param  {[type]} scope [description]
         * @param  {[type]} _id   [description]
         * @return {[type]}       [description]
         */
        this.delete = function(scope, apiUrl) {
            $http.delete(apiUrl + scope.id)
                .success(function(data) {
                    console.log(scope);
                    scope.$dismiss();
                    scope.items.splice(scope.index, 1);
                });
        };

        /**
         * [function description]
         * @author [author]
         * @param  {[type]} scope  [description]
         * @param  {[type]} apiUrl [description]
         * @return {[type]}        [description]
         */
        this.update = function(scope, apiUrl) {
            $http.put(apiUrl + scope.id, {
                id               : scope._id,
                itemName         : scope.itemName,
                itemKana         : scope.itemKana,
                itemOtherName    : scope.itemOtherName,
                itemBranch       : scope.itemBranch,
                itemTel          : scope.itemTel,
                itemIntroduction : scope.itemIntroduction,
                itemLink         : scope.itemLink,
                itemArea         : scope.itemArea
            })
            .success(function(data) {
                scope.items[scope.index] = data;
                scope.$dismiss();
            });
        };
}]);
