"use strict";
angular.module('app.controllers', [])

// Ctrl for First Page (search)
.controller('concertSearchCtrl',['$scope','$log','getConcert', function($scope, $log, getConcert) {
    $scope.getConcert = getConcert;
    $scope.getInfo = function () {
        // code goes here and excecuted after button is cliecked
    };
}])

.controller('nearMeInputCtrl', ['$scope', '$http', 'getConcert', '$log','$state','$ionicLoading','$stateParams' ,'$ionicModal','$timeout', function($scope, $http, getConcert, $log, $state, $ionicLoading,$stateParams, $ionicModal, $timeout) {



    $scope.getGeoLocation = function () {
        $ionicLoading.show({
            template: 'Where are you...?'
        });

        // Native Geolocation Acquire
        navigator.geolocation.getCurrentPosition(function(pos) {
            $ionicLoading.hide();
            // $log.info(pos);
            $scope.position = pos;
            // $log.info(pos.coords);
            var latitude = pos.coords.latitude;
            var longitude = pos.coords.longitude;
            var lokal = latitude + ',' + longitude;
            $scope.lokal = lokal;
            // $log.info( 'LOKAL   : ' + lokal);
            // alert('Your location is: ' + latitude + ' latitude' + ' and ' + longitude + ' longitude');
            var key = 'AIzaSyBVHWevPqM-uykA2Th-x0qAUSTHjvuYxD4';
            $log.info(lokal);
            var geoURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lokal + '&key=' + key;
            // $http.get using google maps geocoding...
            $http.get(geoURL)
            .then(function (response) {
                // $log.info(geoURL);
                $log.info(response);
                $scope.userLocationlocation = response.data.results[0].formatted_address;
                var whereAreYou = $scope.userLocationlocation;
                $scope.locateShow = whereAreYou;
                $log.info( 'locate show -->' + $scope.locateShow);
                alert( 'We know where you are! See -->' + whereAreYou);

            });

        });
        $scope.letsGo = true;
    }; // End of getGeoLocation button....
}])

.controller('nearMeResultsCtrl',['$scope', '$stateParams', 'getConcert','$log','$http', '$ionicModal','$ionicLoading','$timeout', function($scope, $stateParams, getConcert, $log, $http, $ionicModal, $ionicLoading, $timeout) {
    $scope.pos = $stateParams.pos;
    $scope.lokal = $stateParams.lokal;
    // $log.info( 'lokal: ' + $scope.lokal);
    $scope.locateShow = $stateParams.locateShow;

    // origins = current user location
    var origins = $scope.lokal;
    // destinations = destination of venues (?)... var destinations = the loops of latitude and longitude of venue locations. Hence we need to organize the lat + long of each venue location.
    // this is stockholm at the moment.
    var destinations = '59.3294,18.0686';

    // mode = type of travel (just for fun code here..)...
    var mode = 'walking';
    var distanceURL = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + origins + '&destinations=' + destinations + '&mode=' + mode + '&language=uk-EN';
    // $log.info( 'distance URl :' + distanceURL);
    // $http.get(distanceURL)
    // .then(function (distanceResponse){
    //     // $log.info(distanceResponse);
    //     $scope.distance = distanceResponse.data;
    //     var distanceKM = $scope.distance.rows[0].elements[0].distance.text;
    //     var duration = $scope.distance.rows[0].elements[0].duration.text;
    //     $log.info('The distance is: ' + distanceKM + ' & the time to get there is: ' + duration);
    //     alert('The distance is: ' + distanceKM + ' & the time to get there is: ' + duration);
    //
    //
    //
    // });
    var key = 'AIzaSyBVHWevPqM-uykA2Th-x0qAUSTHjvuYxD4';
    var geoURL = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + $scope.lokal + '&key=' + key;

    // $http.get using google maps geocoding...
    function geoURl () {
        $http.get(geoURL)
        .then(function (response) {
            // $log.info(geoURL);
            $log.info(response);
                $scope.userLocation = response.data.results[3].formatted_address;



        });
    }
    $ionicLoading.show({
        template: 'Location Acquired',
        animation: 'fade-in'
    });
    $timeout(function(){

        geoURl();
        $ionicLoading.hide();
    },540);


    var locateUrl = 'http://api.bandsintown.com/events/search.json?location=' + $scope.lokal + '&radius=1';
    $log.info('locateUrl: ' + locateUrl);
    function locateFunction() {
        $http.get(locateUrl)
        .then(function(locationResponse) {
            // $log.info(locationResponse);
            $scope.location = locationResponse.data;
            $log.info($scope.location);
            var theName = locationResponse.data;
            // $log.info($scope.location);
            angular.forEach(theName, function (item) {
                // $log.info(item);
                $log.info('wee litte leaf --> ' + item.artists[0].name);
                $scope.artistsName = item.artists[0].name;
            });

        });
    }
    $timeout(function() {
        locateFunction();
    }, 400);



}])

.controller('resultsCtrl', ['$scope', '$http', 'getConcert', '$log','$state','$ionicLoading','getLocation', function($scope, $http, getConcert, $log, $state, $ionicLoading, getLocation) {
    $log.info(getLocation);
    // searches for events of an artist.
    $ionicLoading.show();
    $scope.getConcert = getConcert;
    var query = $scope.getConcert.query;
    var params = {
        artist: query,
        app_id: 'tenkaklet'
    };

    var ArtistEventUrl = 'http://api.bandsintown.com/artists/' + query + '/events.json?';
    // $log.info(ArtistEventUrl);
    $http.get(ArtistEventUrl, params)
    .then(function (response) {
    // $log.info(response);

        $scope.artists = response.data;
        $log.info($scope.artists);
        $ionicLoading.hide();
        if (response.data.length === 0) {
            $log.info('No artist found');
            $scope.notFound = true;
        }


        $scope.artistsName = response.data[0].artists[0].name;

        // $log.info($scope.artistsName);

    });
}])



.controller('artistPageCtrl',['$scope','$stateParams', 'getConcert', '$log', '$http',function($scope, $stateParams, getConcert, $log, $http) {
    $scope.getConcert = getConcert;
    $scope.name = $stateParams.name;
    $scope.getConcert = getConcert;
    var query = $scope.getConcert.query;
    var params = {
        artist: query,
        app_id: 'tenkaklet'
    };

    var ArtistEventUrl = 'http://api.bandsintown.com/artists/' + query + '/events.json?';
    // $log.info('ArtitsEVentsURl ' + ArtistEventUrl);
    $http.get(ArtistEventUrl, params)
    .then(function (EventResponse) {
        // $log.info(EventResponse);

        // $log.info($scope.Events);
        $scope.artistsName = EventResponse.data[0].artists[0].name;
        // $log.info($scope.artistsName);

        //Check Ticket Availability
        var checkTicket = EventResponse.data;
        angular.forEach(checkTicket, function (item) {


            if (item.ticket_status === 'available') {
                item["ticketAvailability"] = true;
            } else if (item.ticket_status === 'unavailable') {
                item["ticketAvailability"] = false;
            }

            // $log.info(item.ticketAvailability);
        }); //End $httGet ofh ArtitsEVentsURl
        $scope.Events = checkTicket;
        $log.info(checkTicket);

        var ArtistURl = 'http://api.bandsintown.com/artists/' + $scope.artistsName + '.json?api_version=2.0&app_id=tenkaklet';

        // $log.info( 'ArtistUrl' + ArtistURl);
        $http.get(ArtistURl, params)
        .then(function (Artistresponse) {
            // $log.info(Artistresponse);
            $scope.artists = Artistresponse.data;
            // $log.info($scope.artists);
            // $log.info($scope.artistsName);
        });
    });





}]);
