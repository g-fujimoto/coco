'use strict';

angular.module('webApp').controller('ModalController', ['$scope', 'Upload', '$uibModalInstance', '$http', function ($scope, Upload, $uibModalInstance, $http) {

    //--------------------- Kick -------------------- //
    //saveAPIをキック
    $scope.save = function (newData) {
        $scope.saveAPI(newData, $scope);
    };

    //updateAPIをキック
    $scope.update = function (editData) {
        $scope.updateAPI(editData, $scope);
    };

    //deleteAPIをキック
    $scope.delete = function (data) {
        $scope.deleteAPI(data, $scope);
    };

    $scope.checkPassword = function (editData) {
        $http({
            method: 'POST',
            data: editData,
            url: '/api/users/checkPassword'
        }).success(function (data) {
            if (data.message === 'success') {
                editData.passwordFlg = true;
                editData.password = editData.newPassword;
                $scope.updateAPI(editData, $scope);
            } else {
                $scope.errors = {
                    message: '現在のパスワードに誤りがあります。'
                };
            }
        });
    };

    // ------------------- OtherFunction -------------------- //

    //キャンセルボタン
    $scope.cancel = function () {
        $uibModalInstance.dismiss();
    };

    $scope.$watch('files', function (newValue, oldValue) {

        if (oldValue) {
            for (var i in oldValue) {
                $scope.files.push(oldValue[i]);
            }
        }

        if ($scope.files && $scope.files.length > 5) {
            $scope.files.splice(0, $scope.files.length - 5);
        }
    });

    $scope.$watch('onefile', function (newValue, oldValue) {

        if (oldValue) {
            for (var i in oldValue) {
                $scope.onefile.push(oldValue[i]);
            }
        }

        if ($scope.onefile && $scope.onefile.length > 1) {
            $scope.onefile.splice(0, $scope.onefile.length - 1);
        }
    });
}]);