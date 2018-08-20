'use strict'
var c = console;
//http://127.0.0.1:5984/pok/_design/app/_view/byname?key="bulbasaur"
angular.module('pokemonApp', ['ngRoute'])

	.config(function($routeProvider) {
	    $routeProvider
	        .when('/home', {
	            templateUrl: 'assets/views/home.html',
	            controller: 'homeCtrl'
	        })
	        .otherwise({redirectTo:'/home'});
	})
	
	.controller('homeCtrl', function($scope,$http,getPutSrv/*,pokSrv*/) {
		//ik krijg errors in console omdat sommige pokemons wel al bestaan
		// if maken zodat wanneer de pokemon al in de DB zit, niet meer in te doen
		
		/*getPutSrv.getPok().then(function(data){
			var dataJsonPok = data.rows["0"].doc.pokemonJson.docs;
			for(var i = 0; i < dataJsonPok.length; i++ ){
				var name = dataJsonPok[i].name
				var allePok = dataJsonPok[i];	
				getPutSrv.setPok(name,allePok);
			}
		})*/
		
		
			var oudste = $('#pokDateText').val('1998-01-23');
			var nieuwste = $('#pokDateDateText').val('2015-07-11');
          $('#searchButton').on('click', function() {
        	  getPutSrv.getPok().then(function(data){
      			var dataJsonPok = data.rows["0"].doc.pokemonJson.docs;
    			for(var i = 0; i < dataJsonPok.length; i++ ){
    				var owned = dataJsonPok[i].owned;
    				var naamPok = dataJsonPok[i].name;	
        			c.log(naamPok);
    				
    			}
        	  })
        	  
          })
		
		
		 })
		
	
   
  /* .service('pokSrv', function($http, $q) {

    })*/
	
	
	  .service('getPutSrv', function($http, $q){
		  this.setPok = function(key, value){
			  $http.put('../../' + key, value);
		  };
		  
		  this.getPok = function(){
			  var q = $q.defer();
			  $http.get('../../../pokemon/_all_docs?include_docs=true')
			  		.then(function(data){
	  				q.resolve(data.data);
	  			}, function(err) {
	  				q.reject(err);
	  			});
  			
  			  return q.promise;
		  };
	});
    
