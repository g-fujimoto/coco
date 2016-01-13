'use strict';

angular.module('webApp').controller('UsersController', ['$scope', '$Users', '$$Alerts', '$timeout', '$state', '$stateParams', function ($scope, $Users, $$Alerts, $timeout, $state, $stateParams) {
    // ----------------------------------------------- $scope ----------------------------------------------------//
    $scope.alerts = [];
    $scope.isLogin = true;
    if ($stateParams.alert) {
        $scope.alerts.push($stateParams.alert);

        $timeout(function () {
            $scope.alerts.splice(0, 1);
        }, 1800);
    }
    $scope.apiName = 'users';
    $scope.newData = {};
    $scope.newData.aboutWorks = [{
        title: undefined,
        body: undefined,
        disabled: true,
        button: true,
        label: true
    }];
    $scope.newData.others = [{
        title: undefined,
        body: undefined,
        disabled: true,
        button: true,
        label: true
    }];
    $scope.addAboutWorks = function () {
        $scope.newData.aboutWorks.push({
            title: undefined,
            body: undefined,
            disabled: false,
            button: false,
            label: false
        });
    };

    $scope.addOthers = function () {
        $scope.newData.others.push({
            title: undefined,
            body: undefined,
            disabled: false,
            button: false,
            label: false
        });
    };
    $scope.admins = [{ label: '一般', type: 0 }, { label: '管理者', type: 1 }];
    // ----------------------------------------------- $watch ----------------------------------------------------//
    $scope.stopAboutWorks = $scope.$watch('newData.aboutWorks', function (newValue) {
        angular.forEach(newValue, function (element, index) {
            if (newValue[index].title && newValue[index].body) {
                newValue[0].disabled = false;
            } else {
                newValue[0].disabled = true;
            }
        });
    }, true);

    $scope.stopOthers = $scope.$watch('newData.others', function (newValue) {
        angular.forEach(newValue, function (element, index) {
            if (newValue[index].title && newValue[index].body) {
                newValue[0].disabled = false;
            } else {
                newValue[0].disabled = true;
            }
        });
    }, true);

    // ----------------------------------------------- RESTful API -----------------------------------------------//
    // データ全件取得
    $scope.datas = $Users.query();

    //データ新規作成
    $scope.saveAPI = function () {
        console.log($scope.newData);
        $Users.save($scope.newData, function () {
            $scope.datas = $Users.query();
            $state.go('users', {
                alert: $$Alerts.successSave
            });
        });
    };

    //データ更新
    $scope.updateAPI = function (editData, scope) {
        $Users.update(editData, function () {
            $scope.datas = $Users.query();
            $scope.alerts.push($$Alerts.successUpdate);
            $scope.datas.splice($scope.index, 1);
            $timeout(function () {
                $scope.alerts.splice(0, 1);
            }, 1800);
            scope.$dismiss();
        });
    };

    //データ削除
    $scope.deleteAPI = function (data, scope) {
        $Users.delete({ _id: scope.data._id }, function () {
            $scope.datas = $Users.query();
            $scope.alerts.push($$Alerts.successDelete);
            $scope.datas.splice($scope.index, 1);
            scope.$dismiss();
            $timeout(function () {
                $scope.alerts.splice(0, 1);
            }, 1800);
            scope.$dismiss();
        });
    };
}]);