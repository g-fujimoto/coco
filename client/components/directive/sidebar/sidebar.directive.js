angular.module('webApp')
    .directive('cocoSidebar', () => {
        return {
            templateUrl: './components/directive/sidebar/sidebar.html',
            restrict: 'E'
        };
    })
    .directive('cocoSidebarMin', () => {
        return {
            templateUrl: './components/directive/sidebar/sidebarMin.html',
            restrict: 'E'
        };
    });
