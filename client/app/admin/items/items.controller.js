angular.module('webApp')
    .controller('ItemsController', ['$scope', '$modalService', '$ItemsService', '$$Genres', '$$Rate', '$$Scene',
            function($scope, $modalService,  $ItemsService, $$Genres, $$Rate, $$Scene) {
                //Items全件出力
                $ItemsService.findAll($scope);

                $scope.alerts = [];
                $scope.rates  = $$Rate;
                $scope.scenes = $$Scene;
                $scope.genres = $$Genres;

                    $scope.$watch('genre', function(newValue, oldValue) {
                        if (newValue) {
                            $scope.selectGenre = true;
                        } else {
                            $scope.selectGenre = false;
                        }
                    });

                    $scope.$watch('scene', function(newValue, oldValue) {
                        if (newValue) {
                            $scope.selectScene = true;
                        } else {
                            $scope.selectScene = false;
                        }
                    });

                    $scope.myFilter = function(value, index) {

                    };

                //Itemsデータ登録
                $scope.registerItem = function() {
                    var postData = {
                        itemName        : $scope.itemName,
                        itemKana        : $scope.itemKana,
                        itemBranch      : $scope.itemBranch,
                        itemOtherName   : $scope.itemOtherName,
                        itemTel         : $scope.itemTel,
                        itemIntroduction: $scope.itemIntroduction,
                        address         : $scope.address,
                        genre           : {
                            name           : $scope.genre.name,
                            tasteRate      : $scope.tasteRate.rating,
                            beautifuleRate : $scope.beautifuleRate.rating,
                            qualityRate    : $scope.qualityRate.rating,
                            originalityRate: $scope.originalityRate.rating,
                            senseRate      : $scope.senseRate.rating
                        },
                        scene           : {
                            name: $scope.scene.name,
                            value1: $scope.value1.rating,
                            value2: $scope.value2.rating,
                            value3: $scope.value3.rating,
                            value4: $scope.value4.rating,
                            value5: $scope.value5.rating
                        }
                    };
                    $ItemsService.save($scope, postData);
                };




// ----------------------------------------------- モーダル呼び出し -----------------------------------------------//

                //シーンモーダル呼び出し
                $scope.showScencesModal = function() {
                    $modalService.open({
                        scope   : $scope,
                        modalUrl: './components/modal/modal.register.html',
                        title   : 'シーン',
                        titleEng: 'scenes'
                    });
                };

                //ジャンルモーダル呼び出し
                $scope.showGenresModal = function() {
                    $modalService.open({
                        scope   : $scope,
                        modalUrl: './components/modal/modal.register.html',
                        title   : 'ジャンル',
                        titleEng: 'genres'
                    });
                };

                //タグモーダル呼び出し
                $scope.showTagsModal = function() {
                    $modalService.open({
                        scope   : $scope,
                        modalUrl: './components/modal/modal.tags.html',
                        title   : 'タグ',
                        titleEng: 'tags'
                    });
                };

                //編集モーダル呼び出し
                $scope.showEditModal = function() {
                    $modalService.open({
                        scope   : $scope,
                        modalUrl: './components/modal/modal.edit.html'
                    });
                };

                //削除モーダル呼び出し
                $scope.showDeleteModal = function() {
                    $modalService.open({
                        scope   : $scope,
                        modalUrl: './components/modal/modal.delete.html'
                    });
                };
    }]);
