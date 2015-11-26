angular.module('webApp')
    .controller('ItemsController', ['$scope', '$uibModal', '$ItemsService', '$AreaService', '$$Genres',
            function($scope, $uibModal,  $ItemsService, $AreaService, $$Genres) {

                //$scope宣言
                $scope.alerts = [];

                //Items全件出力
                $ItemsService.findAll($scope);

                //Area情報取得
                $AreaService.findAll($scope);

                $scope.genres = $$Genres.map(function(element) {
                    return element.name;
                });

                //Itemsデータ登録
                $scope.registerItem = function() {
                    // console.log($scope);
                    $ItemsService.save($scope, $scope.newItem);
                };

// ----------------------------------------------- モーダル呼び出し -----------------------------------------------//

                //編集モーダル呼び出し
                $scope.showEditModal = function($index) {
                    $scope.index      = $index;
                    $scope.selectItem = $scope.items[$index];
                    $scope.editItem   = {
                        _id       : $scope.selectItem._id,
                        name      : $scope.selectItem.name,
                        branch    : $scope.selectItem.branch,
                        area      : $scope.selectItem.area,
                        kana      : $scope.selectItem.kana,
                        otherName : $scope.selectItem.otherName,
                        tel       : $scope.selectItem.tel,
                        genreName : $scope.selectItem.genreName,
                        address   : {
                            postalCode : $scope.selectItem.address.postalCode,
                            pref       : $scope.selectItem.address.pref,
                            city       : $scope.selectItem.address.city,
                            town       : $scope.selectItem.address.town,
                            building   : $scope.selectItem.address.building
                        }
                    };

                    $uibModal.open({
                        templateUrl : './components/modal/modal.edit.html',
                        scope       : $scope,
                        controller  : 'ModalController',
                        backdrop    : 'static'
                    });
                };

                //削除モーダル呼び出し
                $scope.showDeleteModal = function($index) {
                    $scope._id   = $scope.items[$index]._id;
                    $scope.index = $index;

                    $uibModal.open({
                        controller  : 'ModalController',
                        backdrop    : 'static',
                        scope       : $scope,
                        templateUrl : './components/modal/modal.delete.html'
                    });
                };
    }]);
