angular.module('webApp')
    .service('$Login', ['$http', function($http) {
        this.stateCheck = () => {
            $http.post(
                '/api/users/stateCheck',
                {}
            )
            .success((data) => {
                console.log(data);
            });
        };
    }]);
