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

app.controller('loginController', ['$scope', '$http', '$location', 'DataService', function($scope, $http, $location, DataService){
    $scope.userData = DataService.userData;
    $scope.submitData = function() {
        $http.post('/', $scope.data).then(function (response) {
            if (response.data == 'failure') {
                console.log('failure hit');
                $scope.update = true;
            }
            DataService.makeLoginRequest(response);
            $location.path(response.data.role);
        });
    };
    }]);

app.controller('registerController', ['$scope', '$http', '$location', function($scope, $http, $location){

}]);

app.controller('adminController', ['$scope', '$http', '$location', 'DataService', function($scope, $http, $location, DataService){
    $scope.userData = DataService.userData;
    $scope.items = DataService.userData.server.data.sub_users;



    $scope.newTask = {};
    $scope.newUser = {};

//========================================
    //
    $scope.currentSubuserFunc = function(){
       $scope.currentSubuser = $scope.newTask.selectedUser;
        $scope.userTasks = $scope.newTask.selectedUser.assigned_task;
    };
//========================================
    //This is to create new subuser then clear fields and call change
    $scope.createUser = function(){
        $http.post('/registerUser', $scope.newUser).then(function(response) {
            $scope.newUser = {};
        });
    };
//========================================
    //This is to create new task then clear fields and call change
    $scope.createTask = function(){
        console.log('This is scope newtask',$scope.newTask);
        $http.post('/createTask', $scope.newTask).then(function(response) {
            $scope.userData = response;
            var dataHolder = $scope.newTask.selectedUser;
            $scope.newTask = {};
            $scope.newTask.selectedUser = dataHolder;

        });
    };
    $scope.updatePriority = function(userTask){
        var updateObject = {
            scopeData: $scope.newTask.selectedUser,
            userTaskData: userTask
        };
        $http.post('/updateUser', updateObject).then(function(response){
            //updateMainUser();
            console.log('Adsadadsad', response);
            DataService.makeLoginRequest(response);
            console.log($scope.items);

        });
    };

}]);

app.controller('childController', ['$scope', '$http', '$location', function($scope, $http, $location){

}]);

app.factory('DataService', ['$http', function($http){

    var userData = {};

    var makeLoginRequest = function(data){
            userData.server = data;
            console.log('service data', data);

        };


    return {
        userData: userData,
        makeLoginRequest: makeLoginRequest
    };
}]);