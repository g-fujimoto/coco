angular.module('webApp')
    .controller('CommentsController', ['$scope', '$uibModal', '$Comments', '$AreaService', '$$Genres', '$$Scenes', '$$Rates', '$timeout', '$state',
            function($scope, $uibModal, $Comments, $AreaService, $$Genres, $$Scenes, $$Rates, $timeout, $state) {
                //$scope宣言
                    $scope.alerts  = [];
                    $scope.apiName = 'comments';
                    $scope.$$genres  = $$Genres;
                    $scope.$$scenes  = $$Scenes;
                    $scope.$$rates   = $$Rates;
                    $scope.newComment = {
                        disabled: true
                    };
                    //Postするscenesデータ配列
                    $scope.newComment.scenes = [];

                    //Commentsデータ取得
                    $scope.comments = $Comments.query();

                    //シーン追加処理
                    $scope.selectScenes = [];

                    $scope.addScenes = () => {
                        $scope.newComment.scenes.push($scope.newComment.scene);
                        var selectSceneName = $scope.newComment.scene.name;
                        $scope.$$scenes = _.reject($scope.$$scenes, (element) => {
                            return element.name === selectSceneName;
                        });
                        $scope.selectScenes.push(selectSceneName);
                        if($scope.selectScenes) $scope.noSelectScene = true;
                        $scope.newComment.disabled = true;
                        $scope.newComment.scene = {};
                    };

                    //$watch
                        //newComment.disabled 監視
                        $scope.$watch('newComment', (newValue) => {
                            if(newValue.scene) {
                                if(newValue.scene.name) {
                                    $scope.newComment.disabled = false;
                                }
                            } else {
                                $scope.newComment.disabled = true;
                            }
                        },true);

                    //Commentsデータ登録
                    $scope.createComment = () => {

                        calcAve();

                        $Comments.save(
                            $scope.newComment,
                            () => {
                                $scope.comments = $Comments.query();
                                $timeout(() => {
                                    $scope.alerts.splice(0, 1);
                                }, 1800);

                                $state.go('comments');
                            },
                            () => {
                                console.log('error');
                            }
                        );
                    };


// ----------------------------------------------- モーダル呼び出し -----------------------------------------------//
                //編集モーダル呼び出し
                $scope.showEditModal = function($index) {
                    $scope.index      = $index;
                    $scope.selectComment = $scope.comments[$index];
                    $scope.editComment = _.cloneDeep($scope.selectComment);

                    $uibModal.open({
                        templateUrl : './components/modal/comments/modal.edit.html',
                        scope       : $scope,
                        controller  : 'ModalController',
                        backdrop    : 'static'
                    });
                };

                //削除モーダル呼び出し
                $scope.showDeleteModal = function($index) {
                    $scope._id   = $scope.comments[$index]._id;
                    $scope.index = $index;
                    $uibModal.open({
                        controller  : 'ModalController',
                        backdrop    : 'static',
                        scope       : $scope,
                        templateUrl : './components/modal/modal.delete.html'
                    });
                };

// ----------------------------------------------- 独自関数 -----------------------------------------------//
                const calcAve = () => {
                    //ジャンル平均点
                    const genreRate = _.map($scope.newComment.genre.options, (element) => {
                        return element.rate;
                    });
                    const genreRateSum = genreRate.reduce((x, y) => {
                        return x + y;
                    });
                    $scope.newComment.genreAve = (genreRateSum / 5).toFixed(1);

                    //シーン平均点
                    const scenesRates = _.map($scope.newComment.scenes, (element) => {

                        const sceneRate = _.map(element.options, (childElement) => {
                            return childElement.rate;
                        });
                        const sceneRateAll = sceneRate.reduce((x, y) => {
                                return x + y
                        });
                        return sceneRateAll;
                        });
                    const scenesRatesSum = scenesRates.reduce((x, y) => {
                        return x + y;
                    });
                    $scope.newComment.scenesAve = (scenesRatesSum / $scope.newComment.scenes.length).toFixed(1);
                };
    }]);
