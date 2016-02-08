var app = angular.module('myApp', ['ngRoute']);

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
        .when('/admin', {
            templateUrl: 'views/userAdmin.html',
            controller: 'adminController'
        })
        .when('/user', {
            templateUrl: 'views/userChild.html',
            controller: 'childController'
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
            console.log(response.data);
            if(response.data == 'failure'){
                console.log('failure hit');
                $scope.update = true;
            }
            $location.path(response.data.role);
        });
    };
}]);

app.controller('registerController', ['$scope', '$http', '$location', function($scope, $http, $location){

}]);

app.controller('userIndexController', ['$scope', '$http', '$location', function($scope, $http, $location){
    console.log('userIndexController hit');

}]);

app.controller('adminController', ['$scope', '$http', '$location', function($scope, $http, $location){

}]);

app.controller('childController', ['$scope', '$http', '$location', function($scope, $http, $location){

}]);

app.factory('DataService', function($http){

});