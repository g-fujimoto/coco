angular.module('webApp')
    .controller('SidebarController', ['$scope', '$$Genres', '$$Prefs', '$$Scenes', '$Areas', ($scope, $$Genres, $$Prefs, $$Scenes, $Areas) => {
        $scope.areas  = $Areas.query();
        $scope.genres = $$Genres;
        $scope.prefs  = $$Prefs;
        $scope.scenes = $$Scenes;
    }]);
