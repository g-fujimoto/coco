angular.module('webApp')
    .service('$Like', ['$resource', '$http', ($resource, $http) => {

        this.Recommend = $resource(
            '/api/like/:_id',
            {_id: '@_id'});

        // 追加
        this.Like.add = function(commentid, itemid) {

            var data = {};
            data._commentid = commentid;
            data._itemid = itemid;

            return $http.post('/api/like/add', JSON.stringify(data));
        };

        // 削除
        this.Like.delete = function(commentid, itemid) {

            var data = {};
            data._commentid = commentid;
            data._itemid = itemid;

            return $http.post('/api/like/delete', JSON.stringify(data));
        };

        return this.Like;
    }]);
