
var melodiumApp = angular.module('melodiumApp',['ngRoute','ngAnimate']);
melodiumApp.config(function($routeProvider, $locationProvider) {
    $routeProvider.when('/', {
        templateUrl: 'templates/home.html',
        controller: 'HomeController',
    })
    .when('/results', {
        templateUrl: 'templates/results.html',
        controller: 'ResultsController'
    })
    .otherwise({redirectTo: '/'});
    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: false
    // });
})
.factory('getConcert', [function(){
    return {
        query: ''
    };
}]);
