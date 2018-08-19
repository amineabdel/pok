'use strict'

//http://127.0.0.1:5984/pok/_design/app/_view/byname?key="bulbasaur"
angular.module('pokApp', ['ngRoute'])

	.config(function($routeProvider) {
	    $routeProvider
	        .when('/home', {
	            templateUrl: 'assets/views/home.html',
	            controller: 'homeCtrl'
	        })
	        .otherwise({redirectTo:'/home'});
	})
	
	.controller('homeCtrl', function($scope,pokSrv,saveSrv) {
		$('#pokText').val('charmander');
		$('#searchButton').on('click', function() {
			$scope.pok = '';
			var pokVal = $('#pokText').val().toLowerCase();

			
			pokSrv.getPok(pokVal).then(function(res){
				$scope.pok = res.toString();
		    	
				var doc = {};
				doc.pokMoves = $scope.pok;
				var json = JSON.stringify(doc);

				saveSrv.setObject(pokVal,json);

			}),function(e){
				saveSrv.getObject(pokVal).then(function(data){
					$scope.pok = data.pokMoves;
				})
				console.log("weed " + err);
			}
			
			
		})
	})
   
   .service('pokSrv', function($http, $q) {
	   this.getPok = function(pokName){
		   var q = $q.defer();
			var pokApi = 'https://pokeapi.co/api/v2/pokemon/'+ encodeURIComponent(pokName) +'/';
   		
			$http.get(pokApi).then(function(data){
    			var resultObj = data.data.moves;
    			var moves = [];
    			for(var i = 0; i < resultObj.length;i++){
    				moves.push(resultObj[i].move.name);
    			}
    			q.resolve(moves);
			},function(error){
				q.reject(error);
			});
			return q.promise;
   		
	   }
    })
    
    

    .service('saveSrv', function($http, $q){
		  this.setObject = function(key, value){
			  $http.put('../../' + key, value);
		  };
		  
		  this.getObject = function(key){
			  var q = $q.defer();
			  $http.get('../../' + key)
	  			.then(function(data){
	  				q.resolve(data.data);
	  			}, function(err) {
	  				q.reject(err);
	  			});
  			
  			  return q.promise;
		  };
	});