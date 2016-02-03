angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider


    .state('menu', {
      url: '/side-menu',
      abstract:true,
      templateUrl: 'templates/menu.html'
    })




    .state('menu.concertSearch', {
      url: '/search',
      views: {
        'side-menu21': {
          templateUrl: 'templates/concertSearch.html',
          controller: 'concertSearchCtrl'
        }
      }
    })





    .state('menu.nearMeInput', {
      url: '/nearMe',
      views: {
        'side-menu21': {
          templateUrl: 'templates/nearMeInput.html',
          controller: 'nearMeInputCtrl'
        }
      }
    })





    .state('menu.results', {
      url: '/results',
      views: {
        'side-menu21': {
          templateUrl: 'templates/results.html',
          controller: 'resultsCtrl'
        }
      }
    })





    .state('menu.nearMeResults', {
      url: '/nearMeResults/:lokal',
      views: {
        'side-menu21': {
          templateUrl: 'templates/nearMeResults.html',
          controller: 'nearMeResultsCtrl'
        }
      }
    })





    .state('menu.artistPage', {
      url: '/artistPage/:name',
      views: {
        'side-menu21': {
          templateUrl: 'templates/artistPage.html',
          controller: 'artistPageCtrl'
        }
      }
    })


    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/side-menu/search');

});
