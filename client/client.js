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
    //$scope.userData = DataService.userData;
    $scope.submitData = function() {
        $http.post('/', $scope.data).then(function (response) {
            if (response.data == 'failure') {
                console.log('failure hit');
                $scope.update = true;
            }
            //DataService.makeLoginRequest(response);
            $location.path(response.data.role);
        });
    };
    }]);

app.controller('registerController', ['$scope', '$http', '$location', function($scope, $http, $location){

}]);

app.controller('adminController', ['$scope', '$http', '$location', function($scope, $http, $location){
    $scope.newTask = {};
    $scope.newUser = {};
    $scope.startPage = function() {
        $http.get('/success').then(function (response) {
            console.log(response);
            //$scope.userData = response;
            $scope.items = response.data.sub_users;
        });
    };
    $scope.startPage();

    $scope.updatePage = function() {
        $http.post('/updateMainUser', $scope.newTask.selectedUser).then(function (response) {
            $scope.userTasks = '';
            $scope.items = response.data.sub_users;


        });
    };
//========================================
    //
    $scope.currentSubuserFunc = function(){
        $scope.doneTask = 0;
       $scope.currentSubuser = $scope.newTask.selectedUser;
        $scope.userTasks = $scope.newTask.selectedUser.assigned_task;
        for(var i=0;i<$scope.newTask.selectedUser.assigned_task.length;i++){
            if ($scope.newTask.selectedUser.assigned_task[i].task_priority === 4){
                if($scope.newTask.selectedUser.assigned_task[i].task_money != undefined) {
                    $scope.totalMoneyCollect += $scope.newTask.selectedUser.assigned_task[i].task_money;
                }
                else {
                    $scope.totalMoneyCollect += 0;
                }
                $scope.doneTask++;
            };
        };
    };
//========================================
    //This is to create new subuser then clear fields and call change
    $scope.createUser = function(){
        $http.post('/registerUser', $scope.newUser).then(function(response) {
            $scope.newUser = {};
            $scope.updatePage();
        });
    };
//========================================
    //This is to create new task then clear fields and call change
    $scope.createTask = function(){
        $http.post('/createTask', $scope.newTask).then(function(response) {
            $scope.userTasks = response.data.subDocFind.assigned_task;

            $scope.newTask.taskName = '';
            $scope.newTask.taskMoney = '';

        });
    };
    $scope.updatePriority = function(userTask){
        var updateObject = {
            scopeData: $scope.newTask.selectedUser,
            userTaskData: userTask
        };
        $http.post('/updateUser', updateObject).then(function(response){
            $scope.userTasks = response.data.subTaskFind.assigned_task;


        });
    };

    $scope.deleteTask = function(userTask) {
        var deleteObject = {
            scopeData: $scope.newTask.selectedUser,
            userTaskData: userTask
        };
        $http.post('/deleteTask', deleteObject).then(function (response) {
            console.log(response.data);
            $scope.userTasks = response.data.subTaskFind.assigned_task;

        })
    };
}]);

app.controller('childController', ['$scope', '$http', '$location', function($scope, $http, $location){

}]);

