var app = angular.module('webApp');

app.controller('MainController', ['$scope', '$http', '$uibModal', 'Upload', '$Users', '$Comments', '$$Scenes', '$$Genres', '$timeout', '$stateParams',
    function($scope, $http, $uibModal, Upload, $Users, $Comments, $$Scenes, $$Genres, $timeout, $stateParams) {

// ----------------------------------------------- $scope ----------------------------------------------------//
        $scope.global_menu = 'main';
        $scope.pages       = [];
        $scope.genres = $$Genres;
        $scope.scenes = $$Scenes;
        $scope.fromLogin = $stateParams.fromLogin;

        $scope.findAddArea = function(value) {
            $scope.area = ($scope.area == value) ? null : value;
            getItem();
        };

        $scope.findAddScene = function(value) {
            $scope.sceneName = ($scope.sceneName == value) ? null : value;
            getItem();
        };

        $scope.findAddGenre = function(value) {
            $scope.genreName = ($scope.genreName == value) ? null : value;
            getItem();
        };

// ----------------------------------------------- RESTful API -----------------------------------------------//

        $scope.saveAPI = (newData, scope) => {
            newData.item = newData.item._id;
            if (newData.type) calcAve(newData);
            $Comments.save(
                newData,
                (data) => {
                    $scope.comments = $Comments.query();
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

                    if (scope.files) {
                        upload(scope.files, data._id);
                    } else {
                        getComments();
                    }
                    modPop();
                    scope.$dismiss();
                }
            );
        };
// ----------------------------------------------- $watch ----------------------------------------------------//

        // ページャー処理
        $scope.$watch('currentPage', (newValue, oldValue) => {
            if (!newValue) {
                $scope.currentPage = 1;
            } else if (newValue != 1 && newValue > $scope.pages.length) {
                $scope.currentPage = $scope.pages.length;
            } else if(oldValue){
                getComments();
            }
        });

        $scope.$watch('word', (newValue, oldValue) => {
            if (!newValue && !oldValue) return;
            getItem();
        });

// ----------------------------------------------- LocalFunction -----------------------------------------------//

        const getItem = () => {

            var data = {};
            if ($scope.word) data.name = $scope.word;
            if ($scope.sceneName) data.sceneNames   = $scope.sceneName;
            if ($scope.genreName) data.genreName   = $scope.genreName;
            if ($scope.area) data.area   = $scope.area;

            $http.post('/api/items/find', JSON.stringify(data))
            .success((data) => {
                $scope.items = data;
                getComments();

                $scope.currentPage = 1;
                $scope.pages       = [];
                for(var i = Math.ceil(data.length/10) + 1;--i;) {
                    $scope.pages.unshift(i);
                }
            });
        };

        const getComments = () => {

            var data = {};
            data.item = _.pluck($scope.items, '_id');

            $http.post('/api/comments/find', JSON.stringify(data))
            .success((data) => {

                // 店舗IDリスト作成
                var item_ids = _.pluck($scope.items, '_id');

                var item_comments = [];

                // 店舗毎にコメントを操作
                for (var i in item_ids) {

                    var comments = _.filter(data, (num) => {
                        return num.item._id === item_ids[i];
                    });

                    // 最新コメント情報作成
                    var comment = comments[0];
                    // 行きたいコメントに絞り込み①
                    comments = _.filter(comments, (num) => {
                        return num.type === true;
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

                    item_comments[item_ids[i]] = {comment, genreAve, sceneAve };

                }

                $scope.item_comments = item_comments;

                $scope.show_loading = false;
            });
        };

        const calcAve = (newData) => {
            //ジャンル平均点
            const genreRate = _.map(newData.genre.options, (element) => {
                return element.rate;
            });
            const genreRateSum = genreRate.reduce((x, y) => {
                return parseInt(x) + parseInt(y);
            });
            newData.genreAve = (genreRateSum / 5).toFixed(1);

            //シーン平均点
            const sceneRate = _.map(newData.scene.options, (element) => {
                return element.rate;
            });
            const sceneRateSum = sceneRate.reduce((x, y) => {
                return parseInt(x) + parseInt(y);
            });
            newData.sceneAve = (sceneRateSum / 5).toFixed(1);
        };

        const upload = (files, comment_id) => {

            if(files && files.length) {
                for(var sortNo = 0; sortNo < files.length; sortNo++) {
                    var file = files[sortNo];
                    var data = {file, comment_id, sortNo};
                    Upload.upload({
                        url: '/api/upload/comment',
                        data
                    })
                    .success((data, status, header, config) => {
                        // TODO
                    });
                }
            }

            $timeout(function() {
                getComments();
            },1000);
        };

        const modPop = () =>  {
            $timeout(() => {
                if ($scope.pop.show) {
                  $scope.pop.show = false;
                } else {
                    modPop();
                }
            },3000);
        };
// ----------------------------------------------- Immediately Function -----------------------------------------------//
        getItem();

// ----------------------------------------------- Animation ----------------------------------------------------------//
        if($scope.isLogin && $scope.fromLogin) {
            $scope.onceAnimate = true;
            $timeout(() => {
                var panel = document.getElementById('loginUser');
                var panelElem = angular.element(panel);
                angular.element(panelElem).on('webkitAnimationEnd mozAnimationeEnd MSAnimationEnd oanimationend animationend', () => {
                    angular.element(panelElem).removeClass('animated fadeInRight loginAnimated');
                    $timeout(() => {
                        angular.element(panelElem).addClass('animated fadeOutRight loginAnimate');
                        $scope.onceAnimate = false;
                    }, 1800);
                });
            }, 1000);
        }

}]);
