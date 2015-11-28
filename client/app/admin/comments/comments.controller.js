angular.module('webApp')
    .controller('CommentsController', ['$scope', '$uibModal', '$Comments', '$AreaService', '$$Genres', '$$Scenes', '$$Rates', '$timeout', '$state',
            function($scope, $uibModal, $Comments, $AreaService, $$Genres, $$Scenes, $$Rates, $timeout, $state) {
                //$scope宣言
                    $scope.alerts  = [];
                    $scope.apiName = 'comments';
                    $scope.genres  = $$Genres;
                    $scope.scenes  = $$Scenes;
                    $scope.rates   = $$Rates;

                    $scope.comments = $Comments.query();

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
                    $scope.newComment.genre.ave = (genreRateSum / 5).toFixed(1);
                    //シーン平均点

                };
    }]);
