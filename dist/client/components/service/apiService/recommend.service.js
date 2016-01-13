'use strict';

angular.module('webApp').service('$Recommend', ['$resource', '$http', function ($resource, $http) {

    undefined.Recommend = $resource('/api/recommend/:_id', { _id: '@_id' });

    // ユーザーの推薦店舗検索
    undefined.Recommend.userRecommend = function (data) {
        return $http.post('/api/recommend/userRecommend', data);
    };

    // 追加
    undefined.Recommend.add = function (itemid) {

        var data = {};
        data._itemid = itemid;

        return $http.post('/api/recommend/add', JSON.stringify(data));
    };

    // 削除
    undefined.Recommend.delete = function (itemid) {

        var data = {};
        data._itemid = itemid;

        return $http.post('/api/recommend/delete', JSON.stringify(data));
    };

    return undefined.Recommend;
}]);