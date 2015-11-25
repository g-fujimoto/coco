angular.module('webApp')
    .controller('ItemsController', ['$scope', '$uibModal', '$ItemsService', '$$Genres', '$$Rate', '$$Scenes',
            function($scope, $uibModal,  $ItemsService, $$Genres, $$Rate, $$Scene) {
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
                            beautifuleRate : $scope.beautifulRate.rating,
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


                //ジャンルモーダル呼び出し
                $scope.showGenresModal = function() {
                    $scope.data = {
                        title: 'ジャンル',
                        titleEng: 'genre'
                    };
                    $uibModal.open({
                        scope   : $scope,
                        templateUrl: './components/modal/modal.genre.html',
                        controller : 'ModalController',
                        backdrop   : true
                    });
                };

                //シーンモーダル呼び出し
                $scope.showScencesModal = function() {
                    $scope.data = {
                        title: 'シーン',
                        titleEng: 'scene'
                    };
                    $uibModal.open({
                        scope   : $scope,
                        templateUrl: './components/modal/modal.genre.html',
                        controller : 'ModalController',
                        backdrop   : true
                    });
                };

                //編集モーダル呼び出し
                $scope.showEditModal = function($index) {
                    var selectRow = $scope.items[$index];

                    $scope.selectRow = selectRow;
                    $scope.selectRow.index = $index;
                    console.log(selectRow);

                    $uibModal.open({
                        templateUrl: './components/modal/modal.edit.html',
                        scope      : $scope,
                        controller : 'ModalController',
                        backdrop   : true
                    });
                };

                //削除モーダル呼び出し
                $scope.showDeleteModal = function($index) {
                    $scope.id = $scope.items[$index]._id;
                    $scope.index = $index;
                    $modalService.open({
                        scope   : $scope,
                        modalUrl: './components/modal/modal.delete.html'
                    });
                };
    }]);
