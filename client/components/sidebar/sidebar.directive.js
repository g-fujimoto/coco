angular.module('webApp')
    .directive('cocoSidebar', () => {
        return {
            templateUrl: './components/sidebar/sidebar.html',
            restrict: 'E'
        };
    });
