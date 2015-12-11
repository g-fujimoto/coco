angular.module('webApp')
    .service('$Recommend', ['$resource', '$http', ($resource, $http) => {

        this.Recommend = $resource(
            '/api/recommend/:_id',
            {_id: '@_id'});

        // ユーザーの推薦店舗検索
        this.Recommend.userRecommend = (data) => {
            return $http.post('/api/recommend/userRecommend', data);
        };

        // 追加
        this.Recommend.add = function(itemid) {

            var data = {};
            data._itemid = itemid;

            return $http.post('/api/recommend/add', JSON.stringify(data));
        };

        // 削除
        this.Recommend.delete = function(itemid) {

            var data = {};
            data._itemid = itemid;

            return $http.post('/api/recommend/delete', JSON.stringify(data));
        };

        return this.Recommend;
    }]);
