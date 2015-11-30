angular.module('webApp')
    .controller('SidebarController', ['$scope', '$$Genres', '$$Prefs', '$$Scenes', '$Areas', ($scope, $$Genres, $$Prefs, $$Scenes, $Areas) => {
        $scope.areas = $Areas.query();
        console.log($scope.areas);
    }]);
