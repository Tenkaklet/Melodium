var melodiumApp = angular.module('melodiumApp')

.controller('HomeController', ['$scope', '$http','$q', '$timeout', '$location','$log','getConcert', function ($scope, $http, $q, $timeout, $location, $log, getConcert) {

    $scope.getInfo = function () {
        getConcert.query = $scope.query;
        $location.path('/results');
    };
    console.log('Shanequa!');
}])
.controller('ResultsController', ['$scope', '$http','$q', '$timeout', '$log','$routeParams','getConcert','$location',function ($scope, $http, $q, $timeout, $log, $routeParams, getConcert, $location) {
    $scope.currentSearch = getConcert.query;
    $scope.getConcert = getConcert;
    $scope.getConcert.query = $scope.query;
    $scope.artists = [];
    var query = $scope.currentSearch;
    var params = {
        artist: query,
        app_id: 'tenkaklet'
    };
    var ArtistEventUrl = 'http://api.bandsintown.com/artists/' + query + '/events.json?';
    $http.get(ArtistEventUrl, params)
    .then(function(potato) {
        console.warn(potato);
        $scope.artists = potato.data;
        if (potato.data.length === 0) {
            $log.info('No artist found');
            $scope.notFound = true;
        }


        $scope.artistsName = potato.data[0].artists[0].name;
        $scope.artistBio = true;

        var ArtistURl = 'http://api.bandsintown.com/artists/' + $scope.artistsName + '.json?api_version=2.0&app_id=tenkaklet';
        $http.get(ArtistURl)
        .then(function (response) {
            $scope.artistInfo = response.data;
        });
        var appId = 'b6d13c325ccce22b831f291849e7329d';
        var appkey = '2d0f6e06c2c28d094fd22c24fb081437';
        var musikkiURL = 'https://music-api.musikki.com/v1/artists/?appid=b6d13c325ccce22b831f291849e7329d&appkey=2d0f6e06c2c28d094fd22c24fb081437&q=' +  $scope.artistsName;
        $http.get(musikkiURL)
        .then(function(response) {
            // console.log(response);
            var musikkiData = response.data.results;
            var mkidNum = musikkiData[0].mkid;
            console.info(mkidNum);
            var mkidURL = 'https://music-api.musikki.com/v1/artists/'+mkidNum+'/bio?appid=b6d13c325ccce22b831f291849e7329d&appkey=2d0f6e06c2c28d094fd22c24fb081437';
            // console.log(mkidURL);
            $http.get(mkidURL)
            .then(function(response) {
                var artistBio = response.data;
                $scope.overview = artistBio.summary;
            });
        });
    });
    $scope.newSearch = function () {
        var artistQuery = $scope.artistQuery;
        var params = {
            artist: query,
            app_id: 'tenkaklet'
        };
        $scope.currentSearch = params.artist;
        console.log('artist query', artistQuery);
        $scope.currentSearch = artistQuery;
        var searchAgainURL = 'http://api.bandsintown.com/artists/' + artistQuery + '/events.json?';
        // $scope.currentSearch = $scope.artistQuery;
        console.warn($scope.artistQuery);
        $http.get(searchAgainURL, params)
        .then(function (response) {
            console.log(response);
            $scope.artists = response.data;
            if (response.data.length === 0) {
                $log.info('No artist found');
                $scope.notFound = true;
                $scope.artistBio = false;
            }


            $scope.artistsName = response.data[0].artists[0].name;
            $scope.artistBio = true;

            var ArtistURl = 'http://api.bandsintown.com/artists/' + $scope.artistsName + '.json?api_version=2.0&app_id=tenkaklet';
            $http.get(ArtistURl)
            .then(function (response) {
                $scope.artistInfo = response.data;
                // console.warn($scope.artistInfo);
            });
            var appId = 'b6d13c325ccce22b831f291849e7329d';
            var appkey = '2d0f6e06c2c28d094fd22c24fb081437';
            var musikkiURL = 'https://music-api.musikki.com/v1/artists/?appid=b6d13c325ccce22b831f291849e7329d&appkey=2d0f6e06c2c28d094fd22c24fb081437&q=' +  $scope.artistsName;
            $http.get(musikkiURL)
            .then(function(response) {
                // console.log(response);
                var musikkiData = response.data.results;
                var mkidNum = musikkiData[0].mkid;
                // console.info(mkidNum);
                var mkidURL = 'https://music-api.musikki.com/v1/artists/'+mkidNum+'/bio?appid=b6d13c325ccce22b831f291849e7329d&appkey=2d0f6e06c2c28d094fd22c24fb081437';
                // console.log(mkidURL);
                $http.get(mkidURL)
                .then(function(response) {
                    var artistBio = response.data;
                    $scope.overview = artistBio.summary;
                });
            });
        });

    };
    // $scope.newSearch();

}]);
