var app = angular.module('webApp');

app.controller('ShopDetailController', ['$scope', '$http', '$$Scenes', '$$Genres', '$uibModal', 'Upload', '$stateParams', '$Users', '$Comments', '$timeout',
  function($scope, $http, $$Scenes, $$Genres, $uibModal, Upload, $stateParams, $Users, $Comments, $timeout) {

// ----------------------------------------------- $scope(value) ----------------------------------------------------//
    $scope.scenes = $$Scenes;
    $scope.genres = $$Genres;
    $scope.item   = $stateParams.item;
// ----------------------------------------------- $scope(function) ----------------------------------------------------//

    //item._idで絞ったコメントを全件取得
    $scope.itemComments = (_id) => {
        $Comments.itemComments(_id);
    };

    $scope.getSumAve = () => {

        $Comments.went_items($scope.item._id)
        .success((data) => {

            // 店舗IDリスト作成
            var item_ids = _.pluck($scope.items, '_id');
            var sum_ave = [];

            // 店舗毎にコメントを操作
            for (var i in item_ids) {

                var comments = _.filter(data, (num) => {
                    return num.item._id === item_ids[i];
                });

                // ジャンルポイント平均作成
                var genreAvelist = _.pluck(comments, 'genreAve');
                var genreAveSum = _.reduce(genreAvelist, (memo, num) => {
                     return memo + num;
                }, 0);
                var genreAve = genreAveSum < 1 ? 0 : genreAveSum / genreAvelist.length;

                // シーンポイント平均作成
                var sceneAvelist = _.pluck(comments, 'sceneAve');
                var sceneAveSum = _.reduce(sceneAvelist, (memo, num) => {
                     return memo + num;
                }, 0);
                var sceneAve = sceneAveSum < 1 ? 0 : sceneAveSum / sceneAvelist.length;

                sum_ave[item_ids[i]] = {
                    genreAve,
                    sceneAve
                };
            }

            $scope.sum_ave = sum_ave;

        });
    };

    $Comments.itemComments($stateParams.item._id)
        .success((data) => {
            $scope.itemComments = data;
        });

    $scope.getSumAve();

    $scope.wentFilter = () => {
        if($scope.goFlg === true) {
            $scope.goFlg = undefined;
        } else {
            $scope.goFlg = true;
        }
    };

    $scope.wantGoFilter = () => {
        if($scope.goFlg === false) {
            $scope.goFlg = undefined;

        } else {
            $scope.goFlg = false;
        }
    };

// ---------------------------------------------- GoogleMaps -------------------------------------------------//

$scope.map = {
    center: {
         latitude  : 0,
         longitude : 0
    },
    zoom: 17,
    options: {
        mapTypeId: google.maps.MapTypeId.SATELLITE
    },
    markers: [
        {
            id: 1,
            latitude  : 0,
            longitude : 0,
            title: $scope.item.name,
            content: $scope.item.name,
            show: false
        }
    ]
};

$scope.codeAddress = function () {
    const geocoder = new google.maps.Geocoder();
    const address = {
        pref       : $scope.item.address.pref,
        city       : $scope.item.address.city,
        town       : $scope.item.address.town,
        building   : $scope.item.address.building
    };
    geocoder.geocode(
        {
            address: address.pref + address.city + address.town + address.building,
            'region'  : 'jp'
        },
        (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        $timeout(() => {
            $scope.map.center.latitude      = results[0].geometry.viewport.O.O;
            $scope.map.center.longitude     = results[0].geometry.viewport.j.j;
            $scope.map.markers[0].latitude  = results[0].geometry.viewport.O.O;
            $scope.map.markers[0].longitude = results[0].geometry.viewport.j.j;
        });
      } else {
        alert('地図の読み込みに失敗しました。');
      }
    });
    return;
  };
  $scope.$watch('item', () => {
      $scope.codeAddress();
  });

// ----------------------------------------------- $watch ----------------------------------------------------//

}]);
