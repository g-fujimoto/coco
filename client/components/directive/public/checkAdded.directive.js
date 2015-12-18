angular.module('webApp')
    .directive('checkAdded', () => {
        return (scope, element, attr) => {
            const data = angular.fromJson(attr.checkAdded);
            console.log('hello');
            if(data.item) {
                if(_.contains(scope.$root.loginUser.recommendItems, data.item._id)) {
                    scope.checkRecommend = true;
                } else {
                    scope.checkRecommend = false;
                }
            } else {
                if(_.contains(scope.$root.loginUser.recommendItems, data._id)) {
                    scope.checkRecommend = true;
                } else {
                    scope.checkRecommend = false;
                }
            }
        };
    });
