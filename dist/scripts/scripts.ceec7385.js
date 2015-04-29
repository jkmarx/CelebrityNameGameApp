"use strict";function ModalCtrl(a,b,c,d){a.movies=d.movies,a.open=function(d){var e=b.open({templateUrl:"movieOptions.html",controller:"ModalInstanceCtrl",size:d,resolve:{movies:function(){return a.movies}}});e.result.then(function(b){a.selected=b},function(){c.info("Modal dismissed at: "+new Date)})}}function ModalInstanceCtrl(a,b,c,d){a.movies=c,a.selected={movie:a.movies[0]},a.ok=function(){b.close(a.selected.movie),d.requestActors(a.selected.movie).then(function(a){console.log("in modal instance")})},a.cancel=function(){b.dismiss("cancel")}}function GameCtrl(a,b,c,d,e){var f=this;f.counter=3,f.score=0,f.actors=a.actors,f.actorsNames=a.actorsNames,d.list1=[],d.list2=a.actorsNamesRand,d.alerts=[],f.searchMovie=function(a){b.requestMovies(a).then(function(a){f.movies=b.movies})},f.scoreTally=function(){f.score=f.score+10*f.counter},f.counterTally=function(){f.counter>0&&(f.counter=f.counter-1)},f.checkWinner=function(){f.checkGuess()?(console.log("you win"),f.scoreTally(),f.counter=3,f.addAlertWin(),f.resetLists()):(console.log("try again"),f.counterTally(),f.addAlertFail(),f.resetLists(),f.resetRandList())},f.resetLists=function(){d.list1=[]},f.resetRandList=function(){angular.copy(a.getCastNamesRand(f.actorsNames.slice(0)),d.list2)},f.checkGuess=function(){for(var a=!0,b=0;b<f.actors.length;b++)d.list1[b].name!==f.actors[b].name&&(a=!1);return a},f.listNames=function(a){var b=a.map(function(a){return a.name});return b.join(", ")},f.addAlertWin=function(){d.alerts.push({type:"success",msg:"Well Done Mate! "+f.listNames(d.list1)+" was correct."})},f.addAlertFail=function(){d.alerts.push({type:"warning",msg:"Try Again. "+f.listNames(d.list1)+" was incorrect."})},d.closeAlert=function(a){d.alerts.splice(a,1)},d.startCallback=function(a,b,c){console.log("You started draggin: "+c),d.draggedName=c},d.dropCallback=function(a,b){console.log("hey, you dumped me :-(",d.draggedName),0===d.list2.length&&f.checkWinner()}}angular.module("NameGameApp",["ngAnimate","ngAria","ngResource","ngRoute","ngSanitize","ngTouch","ui.bootstrap","ngDragDrop"]),angular.module("NameGameApp").config(["$routeProvider",function(a){a.when("/welcome",{templateUrl:"views/welcome.html",controller:"GameCtrl"}).when("/game",{templateUrl:"views/game.html",controller:"GameCtrl"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl"}).otherwise({redirectTo:"/welcome"})}]),angular.module("NameGameApp").constant("ServerUrl","https://actornamegameapi.herokuapp.com"),angular.module("NameGameApp").factory("MoviesFactory",["$http","ServerUrl",function(a,b){function c(a){console.log("in MoviesFactory requestFailure"),console.log(a)}var d=[],e=function(e){var f={movie:e};return a.post(b+"/movies",f).then(function(a){console.log(a.data),angular.copy(a.data,d)},c)};return{movies:d,requestMovies:e}}]),angular.module("NameGameApp").factory("ActorsFactory",["$http","ServerUrl",function(a,b){function c(a){console.log("in ActorsFactory requestFailure"),console.log(a)}var d=[],e=[],f=[],g=function(g){var j={movie:g};return a.post(b+"/movies/cast",j).then(function(a){console.log(a.data),angular.copy(a.data,d),angular.copy(h(d),e),angular.copy(i(e.slice(0)),f)},c)},h=function(a){var b=a.map(function(a){return a.name});return b},i=function(a){var b=j(a),c=b.map(function(a){return{name:a,drag:!0}});return c},j=function(a){for(var b=[],c=a.length;c>0;c--)if(c>0){var d=k(0,c);b.push(a[d]),a.splice(d,1)}else b.push(a[0]);return b},k=function(a,b){return Math.floor(Math.random()*(b-a))+a};return{actors:d,requestActors:g,getCastNamesRand:i,actorsNames:e,actorsNamesRand:f}}]),angular.module("NameGameApp").directive("movieForm",[function(){return{restrict:"E",templateUrl:"views/movie-form.html",controller:"GameCtrl",controllerAs:"gameCtrl",bindToController:!0,scope:{credentials:"="}}}]),angular.module("NameGameApp").controller("WelcomeCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("NameGameApp").controller("ModalCtrl",ModalCtrl),ModalCtrl.$inject=["$scope","$modal","$log","MoviesFactory"],angular.module("NameGameApp").controller("ModalInstanceCtrl",ModalInstanceCtrl),ModalInstanceCtrl.$inject=["$scope","$modalInstance","movies","ActorsFactory"],angular.module("NameGameApp").controller("AboutCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("NameGameApp").controller("GameCtrl",GameCtrl),GameCtrl.$inject=["ActorsFactory","MoviesFactory","$location","$scope","$timeout"];