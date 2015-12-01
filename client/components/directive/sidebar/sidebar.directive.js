angular.module('webApp')
    .directive('cocoSidebar', () => {
        return {
            templateUrl: './components/directive/sidebar/sidebar.html',
            restrict: 'E'
        };
    });
