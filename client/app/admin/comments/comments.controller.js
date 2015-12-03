angular.module('webApp')
    .controller('CommentsController', ['$scope', '$uibModal', '$Comments', '$Areas', '$$Genres', '$$Scenes', '$$Rates', '$timeout', '$state', '$$Alert', '$rootScope',
            function($scope, $uibModal, $Comments, $Areas, $$Genres, $$Scenes, $$Rates, $timeout, $state, $$Alert, $rootScope) {
                $rootScope.alerts  = [];
                $scope.apiName = 'comments';
                $scope.genres  = $$Genres;
                $scope.scenes  = $$Scenes;
                $scope.rates   = $$Rates;
                $scope.newComment = {
                    disabled: true
                };
                //Postするscenesデータ配列
                $scope.newComment.scenes = [];

                //シーン追加処理
                $scope.selectScenes = [];

                $scope.addScenes = () => {
                    $scope.newComment.scenes.push($scope.newComment.scene);
                    var selectSceneName = $scope.newComment.scene.name;
                    $scope.scenes = _.reject($scope.scenes, (element) => {
                        return element.name === selectSceneName;
                    });
                    console.log(selectSceneName);
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

                //$Commentsデータ取得
                $scope.datas = $Comments.query();

                //$Commentsデータ登録
                $scope.createComment = () => {

                    calcAve();
                    console.log($scope.newComment);
                    $Comments.save(
                        $scope.newComment,
                        () => {
                            $scope.comments = $Comments.query();
                            $rootScope.alerts.push($$Alert.successRegister);
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

                //$Commentsデータ削除
                $scope.deleteAPI = (_id, scope) => {
                    $Comments.delete(
                        {_id},
                        () => {
                            $scope.datas = $Comments.query();
                            scope.$dismiss();
                            $scope.alerts.push($$Alert.successDelete);
                            $scope.datas.splice($scope.index, 1);
                            $timeout(() => {
                                $scope.alerts.splice(0, 1);
                            }, 1800);
                        }
                    );
                };

                //$Commentsデータ更新
                $scope.updateComment = (scope) => {
                    $Comments.update(
                        $scope.editComment,
                        () => {
                            $scope.datas = $Comments.query();
                            scope.$dismiss();
                            $scope.alerts.push($$Alert.successUpdate);
                            $scope.datas.splice($scope.index, 1);
                            $timeout(() => {
                                $scope.alerts.splice(0, 1);
                            }, 1800);
                        }
                    );
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
                                return x + y;
                        });
                        return sceneRateAll;
                        });
                    const scenesRatesSum = scenesRates.reduce((x, y) => {
                        return x + y;
                    });
                    $scope.newComment.scenesAve = (scenesRatesSum / $scope.newComment.scenes.length).toFixed(1);
                };
    }]);
