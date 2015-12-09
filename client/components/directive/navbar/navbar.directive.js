angular.module('webApp')
    .directive('cocoNavbar', () => {
        return {
            templateUrl: './components/directive/navbar/navbar.html',
            restrict: 'E'
        };
    });
