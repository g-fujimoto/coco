angular.module('webApp')
    .controller('UsersController', ['$scope', '$uibModal', '$ItemsService', '$$Genres', '$$Rate', '$$Scenes',
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

                //Itemsデータ登録(Bad Practice)
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
                $scope.showGenresModal = function($index) {
                    $scope.data = {
                        title: 'ジャンル',
                        titleEng: 'genre'
                    };
                    $scope.index = $index;
                    $scope.selectRow = $scope.items[$index];

                    $uibModal.open({
                        scope   : $scope,
                        templateUrl: './components/modal/modal.genre.html',
                        controller : 'ModalController',
                        backdrop   : 'static'
                    });
                };

                //シーンモーダル呼び出し
                $scope.showScencesModal = function($index) {
                    $scope.data = {
                        title: 'シーン',
                        titleEng: 'scene'
                    };
                    $scope.index = $index;
                    $scope.selectRow = $scope.items[$index];

                    switch($scope.selectRow.scene.name) {
                        case '高級接待' :
                            $scope.sceneMessages = {
                                value1: $scope.scenes[0].value1,
                                value2: $scope.scenes[0].value2,
                                value3: $scope.scenes[0].value3,
                                value4: $scope.scenes[0].value4,
                                value5: $scope.scenes[0].value5
                            };
                            break;
                        case '通常接待' :
                            $scope.sceneMessages = {
                                value1: $scope.scenes[1].value1,
                                value2: $scope.scenes[1].value2,
                                value3: $scope.scenes[1].value3,
                                value4: $scope.scenes[1].value4,
                                value5: $scope.scenes[1].value5
                            };
                            break;
                        case '社内利用' :
                            $scope.sceneMessages = {
                                value1: $scope.scenes[2].value1,
                                value2: $scope.scenes[2].value2,
                                value3: $scope.scenes[2].value3,
                                value4: $scope.scenes[2].value4,
                                value5: $scope.scenes[2].value5
                            };
                            break;
                        case '家族利用' :
                            $scope.sceneMessages = {
                                value1: $scope.scenes[3].value1,
                                value2: $scope.scenes[3].value2,
                                value3: $scope.scenes[3].value3,
                                value4: $scope.scenes[3].value4,
                                value5: $scope.scenes[3].value5
                            };
                            break;
                        case 'お土産利用' :
                            $scope.sceneMessages = {
                                value1: $scope.scenes[4].value1,
                                value2: $scope.scenes[4].value2,
                                value3: $scope.scenes[4].value3,
                                value4: $scope.scenes[4].value4,
                                value5: $scope.scenes[4].value5
                            };
                            break;
                        case '一人利用' :
                            $scope.sceneMessages = {
                                value1: $scope.scenes[5].value1,
                                value2: $scope.scenes[5].value2,
                                value3: $scope.scenes[5].value3,
                                value4: $scope.scenes[5].value4,
                                value5: $scope.scenes[5].value5
                            };
                            break;
                        case 'デート利用' :
                            $scope.sceneMessages = {
                                value1: $scope.scenes[6].value1,
                                value2: $scope.scenes[6].value2,
                                value3: $scope.scenes[6].value3,
                                value4: $scope.scenes[6].value4,
                                value5: $scope.scenes[6].value5
                            };
                            break;
                        default:
                            break;
                    }

                    console.log($scope);

                    $uibModal.open({
                        scope   : $scope,
                        templateUrl: './components/modal/modal.scene.html',
                        controller : 'ModalController',
                        backdrop   : 'static'
                    });
                };

                //編集モーダル呼び出し
                $scope.showEditModal = function($index) {
                    $scope.index = $index;
                    $scope.selectRow = $scope.items[$index];

                    $uibModal.open({
                        templateUrl: './components/modal/modal.edit.html',
                        scope      : $scope,
                        controller : 'ModalController',
                        backdrop   : 'static'
                    });
                };

                //削除モーダル呼び出し
                $scope.showDeleteModal = function($index) {
                    $scope._id = $scope.items[$index]._id;
                    $scope.index = $index;
                    $uibModal.open({
                        controller: 'ModalController',
                        backdrop: 'static',
                        scope   : $scope,
                        templateUrl: './components/modal/modal.delete.html'
                    });
                };
    }]);
