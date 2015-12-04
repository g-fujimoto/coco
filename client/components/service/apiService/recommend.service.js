angular.module('webApp')
    .service('$Recommend', ['$resource', '$http', ($resource, $http) => {

        this.Recommend = $resource(
            '/api/recommend/:_id',
            {_id: '@_id'});

        // 追加
        this.Recommend.add = function(itemid) {

            var data = {};
            data._itemid = itemid;

            $http.post('/api/recommend/add', JSON.stringify(data))
            .success((data) => {
                return data;
            });
            return false;
        };

        // 削除
        this.Recommend.delete = function(itemid) {

            var data = {};
            data._itemid = itemid;

            $http.post('/api/recommend/delete', JSON.stringify(data))
            .success((data) => {
                return data;
            });
            return false;
        };

        return this.Recommend;
    }]);
