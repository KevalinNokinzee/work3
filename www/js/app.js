// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider){
	$stateProvider
		
		.state('history',{
		url: '/history',
		templateUrl: 'templates/history.html',
			//controller: 'AppCtrl'
	})
		.state('Gallory',{
		url: '/Gallory',
		templateUrl: 'templates/Gallory.html',
			controller: 'PlaylistCtrl1'
	})
		
		.state('list',{
		url: '/list',
		templateUrl: 'templates/list.html',
			//controller: 'listCtrl'
	})
		.state('login',{
		url:'/login',
		templateUrl: 'templates/login.html',
			controller: 'loginCtrl'
	}) 
		.state('insert_admin',{
		url: '/insert_admin',
		templateUrl: 'templates/insert_admin.html',
			controller: 'AdminCtrl'
	})
		.state('edit_admin',{
		url: '/edit_admin',
		templateUrl: 'templates/edit_admin.html',
			controller: 'EditadminCtrl'
	})
		.state('del_admin',{
		url: '/del_admin',
		templateUrl: 'templates/del_admin.html',
			controller: 'DeladminCtrl'
	})
	.state('sett',{
		url:'/sett',
		templateUrl: 'templates/sett.html',
			//controller: 'AppCtrl'
	})
		$urlRouterProvider.otherwise('/login');
})

.controller('loginCtrl',function ($scope,$state,$ionicPopup,$http,$ionicHistory) {
  var url="http://localhost/ionic_php/";
  $scope.login={};
 $scope.doLogin=function(){
   
      var admin_user=$scope.login.username;
      var admin_password=$scope.login.password;
      console.log(admin_user);
      if(admin_user && admin_password){
          str=url+"login.php?username="+admin_user+"&password="+admin_password;
          $http.get(str)
            .success(function(response){

                $scope.admin=response.records;
                sessionStorage.setItem('loggedin_status',true);
                sessionStorage.setItem('loggedin_id',$scope.admin.admin_id);
                sessionStorage.setItem('loggedin_status',$scope.admin.admin_user);

                $ionicHistory.nextViewOptions({
                  disableAnimate:true,
                  disableBack:true
                })

                $ionicPopup.alert({
                  title:'ล็อกอิน',
                  template:'ยินดีต้อนรับเข้าสู่ระบบ'
                })

                $state.go('history',{},{location:"replace",reload:true});
            })
            .error(function(){

              $ionicPopup.alert({
                title:'ล็อกอิน',
                template:'ไม่สามารถล็อกอินได้ กรุณาตรวจสอบ'
              })
            });

      }else{
        $ionicPopup.alert({
          title:'ล็อกอิน',
          template:'กรุณากรอกข้อมูลให้ครบ'
        })

      }

  }
})

/*.controller('PlaylistCtrl1',function ($scope){
		$scope.datalist=[
		{fname:"My freinds",lname:"Goodbye Senior",pic:"img/fb1.jpg" },
		{fname:"Watering elderly elders",lname:"Thai New Year",pic:"img/fb2.jpg" },
		{fname:"Ghost",lname:"Science Day",pic:"img/fb3.jpg" },
		{fname:"Field Trips",lname:"Nine Inch Nails",pic:"img/fb4.jpg" },
		{fname:"Party",lname:"Nine Inch Nails",pic:"img/fb5.jpg" }
	];
})*/
.controller('PlaylistCtrl1',function ($scope,$http){
	$scope.datalist=[];
	$scope.url="http://localhost/ionic_php/loaddata.php";
	$http.get($scope.url)
		.success(function(data){
	$scope.datalist = data;
	console.log("ok");
	})
		.error(function(data){
	console.log("error");
	});
})
.controller('AdminCtrl',function ($scope,$http){
	var url="http://localhost/ionic_php/";
	$scope.admin=[];
	$scope.createAdmin=function(){
		var admin_user=$scope.admin.admin_user;
		var admin_password=$scope.admin.admin_password;
      console.log(admin_user);
	str=url+"admin-insert.php?username="+admin_user+"&password="+admin_password;
	$http.get(str)
		.success(function(data){
		if(data==true){
	console.log("ok");
		}
		
		if(data==false){
	console.log("duplicate");
		}
	})
		.error(function(data){
	console.log("error");
	});
	}	
})
.controller('EditadminCtrl',function ($scope,$http){
	var url="http://localhost/ionic_php/";
	$scope.Editadmin=[];
	$scope.editadmin=function(){
		var admin_id=$scope.Editadmin.editadmin.admin_id;
		var admin_user=$scope.Editadmin.editadmin.admin_user;
		var admin_password=$scope.Editadmin.editadmin.admin_password;
      console.log(admin_user);
	str=url+"admin-edit.php?id="+admin_id+"&username="+admin_user+"&password="+admin_password;
	$http.get(str)
		.success(function(data){
		if(data==true){
	console.log("ok");
		}
		
		if(data==false){
	console.log("duplicate");
		}
	})
		.error(function(data){
	console.log("error");
	});
	}	
})
.controller('DeladminCtrl',function ($scope,$http){
	var url="http://localhost/ionic_php/";
	$scope.Deladmin=[];
	$scope.deladmin=function(){
		var admin_id=$scope.Deladmin.deladmin.admin_id;
		//var admin_user=$scope.Deladmin.deladmin.admin_user;
		//var admin_password=$scope.Deladmin.deladmin.admin_password;
      console.log(admin_id);
	str=url+"admin-del.php?id="+admin_id;
	$http.get(str)
		.success(function(data){
		if(data==true){
	console.log("ok");
		}
		
		if(data==false){
	console.log("duplicate");
		}
	})
		.error(function(data){
	console.log("error");
	});
	}	
})