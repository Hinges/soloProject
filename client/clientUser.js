var app = angular.module('appUser', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
        .when('/userAdmin', {
            templateUrl: 'views/userAdmin.html',
            controller: 'adminController'
        })
        .when('/userChild', {
            templateUrl: 'views/userChild.html',
            controller: 'childController'
        })
        .otherwise({
            redirectTo: '/'
        });

    $locationProvider.html5Mode(true);
}]);

app.controller('userIndexController', ['$scope', '$http', '$location', function($scope, $http, $location){
    console.log('userIndexController hit');
    var grabUser = function(id){
        console.log(id);
        $http.get('/userlogin/' + id).then(function(response){
            console.log(response.data);
        });
    };
    grabUser();

}]);

app.controller('adminController', ['$scope', '$http', '$location', function($scope, $http, $location){

}]);

app.controller('childController', ['$scope', '$http', '$location', function($scope, $http, $location){

}]);


