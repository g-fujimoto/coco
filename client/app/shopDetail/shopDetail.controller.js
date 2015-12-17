var app = angular.module('webApp');

app.controller('ShopDetailController', ['$scope', '$http', '$$Scenes', '$$Genres', '$uibModal', 'Upload', '$stateParams', '$Users', '$Comments', '$timeout', '$state', '$Items',
  function($scope, $http, $$Scenes, $$Genres, $uibModal, Upload, $stateParams, $Users, $Comments, $timeout, $state, $Items) {

// ----------------------------------------------- $scope(value) ----------------------------------------------------//
    $scope.scenes = $$Scenes;
    $scope.genres = $$Genres;
    $scope.item   = $stateParams.item;
    $scope.items  = $Items.query();
    $scope.moreMain = true;
// ----------------------------------------------- $scope(function) ----------------------------------------------------//

    //item._idで絞ったコメントを全件取得
    $scope.itemComments = (_id) => {
        $Comments.itemComments(_id);
    };

    $scope.getSumAve = () => {

        $Comments.went_items($scope.item._id)
        .success((data) => {
            //店舗 : ジャンル平均点
            var genreArr = _.pluck(data, 'genreAve');
            var sumGenre = _.reduce(genreArr, (sum, num) => {
                return sum + num;
            });
            $scope.allGenreAve = sumGenre / data.length;
            //店舗 : シーン平均点
            var sceneArr = _.pluck(data, 'sceneAve');
            var sumScene = _.reduce(sceneArr, (sum, num) => {
                return sum + num;
            });
            $scope.allSceneAve = sumScene / data.length;
        });
    };

    $scope.getSumAve();

    $Comments.itemComments($stateParams.item._id)
        .success((data) => {
            $scope.itemComments = data;
        });


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

    $scope.like = (itemComment) => {
        $http({
            method: 'POST',
            url: '/api/like/add',
            data: itemComment
        })
        .success((data) => {
            console.log(data);
            $scope.pop = {
                show : true,
                message : '「いいね」しました。'
            };
            modPop();
        });
    };

// ---------------------------------------------- もっと見る機能 -------------------------------------------------//


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
        (data) => {
            if(data.type === true) {
                $scope.pop = {
                    show : true,
                    message : '「行った」コメントを登録しました。'
                };
            } else {
                $scope.pop = {
                    show : true,
                    message : '「行きたい」コメントを登録しました。'
                };
            }
            modPop();
            scope.$dismiss();
        }
    );
};

// ----------------------------------------------- OtherFunction ---------------------------------------------------//

const modPop = () =>  {
    $timeout(() => {
        if ($scope.pop.show) {
          $scope.pop.show =false;
        } else {
            modPop();
        }
    },3000);
};

}]);
