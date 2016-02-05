var app = angular.module('appLogin', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'views/login.html',
            controller: 'loginController'
        })
        .when('/registration', {
            templateUrl: 'views/registration.html',
            controller: 'registerController'
        })
        .otherwise({
            redirectTo: '/'
        });

        $locationProvider.html5Mode(true);
}]);

app.controller('loginController', ['$scope', '$http', '$location', function($scope, $http, $location){
    $scope.data = {};

    $scope.submitData = function(){
        $http.post('/', $scope.data).then(function(response){
            console.log(response);
            //console.log(response.data);
            //console.log($location.absUrl());

            var path = $location.absUrl() + response.data;
            //if(response.data == 'success'){
            //    console.log('im hitnow');
            //$location.path(response.data);
            window.location.assign(path);
            //console.log(response);
            //}

        });
    };
}]);

app.controller('registerController', ['$scope', '$http', '$location', function($scope, $http, $location){

}]);
