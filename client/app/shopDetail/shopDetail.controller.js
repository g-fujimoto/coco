var app = angular.module('webApp');

app.controller('ShopDetailController', ['$scope', '$http', '$$Scenes', '$$Genres', '$uibModal', 'Upload', '$stateParams', '$Users', '$Comments', '$timeout', '$state',
  function($scope, $http, $$Scenes, $$Genres, $uibModal, Upload, $stateParams, $Users, $Comments, $timeout, $state) {

// ----------------------------------------------- $scope(value) ----------------------------------------------------//
    $scope.scenes = $$Scenes;
    $scope.genres = $$Genres;
    $scope.item   = $stateParams.item;
    $scope.dottedFlg = true;
    $scope.closeFlg = false;
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
            $scope.itemComment.goFlg = undefined;
        } else {
            $scope.itemComment.goFlg = true;
        }
    };

    $scope.wantGoFilter = () => {
        if($scope.goFlg === false) {
            $scope.itemComment.goFlg = undefined;

        } else {
            $scope.itemComment.goFlg = false;
        }
    };

    $scope.moreFlg = () => {
        if($scope.dottedFlg){
            $scope.dottedFlg = false;
            $scope.closeFlg = true;
        } else {
            $scope.dottedFlg = true;
            $scope.closeFlg = false;
        }
    };

    $scope.like = (itemComment) => {
        $http({
            method: 'POST',
            url: '/api/like/add',
            data: itemComment
        })
        .success((data) => {
            console.log(data);
        });
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
            content: $scope.item.address.pref + $scope.item.address.city + $scope.item.address.town + $scope.item.address.building,
            show: true
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
            address  : address.pref + address.city + address.town + address.building,
            'region' : 'jp'
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

angular.forEach('$scope.map.markers', (marker) => {
    marker.onclick = () => {
        marker.show = !marker.show;
    };
});

// ----------------------------------------------- $watch ----------------------------------------------------//

    $scope.$watch('item', (newValue) => {
        if(!newValue) {
            $state.go('main');
        }
        $scope.codeAddress();
    });

// ----------------------------------------------- RESTful ---------------------------------------------------//

// データ登録
$scope.saveAPI = (newData, scope) => {
    newData.item = newData.item._id;
    $Comments.save(
        newData,
        () => {
            scope.$dismiss();
        }
    );
};

}]);
