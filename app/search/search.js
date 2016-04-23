'use strict';

angular.module('myApp.search', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: 'search/search.html',
    controller: 'SearchCtrl'
  });
}])

.controller('SearchCtrl', ['$scope','$http', function($scope,$http) {
  var my_client_id = '2f744e737dcc42f3bd428c6a57064193'; // Your client id
    var my_secret = 'c32da3cadb4942b09496c859df4b93c9'; // Your secret
    var redirect_uri = 'http://localhost:63342/spotify/'; // Your redirect uri

    $scope.searchType = 'artist';
    $scope.changeRadio = function() {
            $scope.searchResults = null;
    }
    $scope.search = function () {
          var searchType = $scope.searchType;
          var searchString = $scope.searchValue;
          var searchURL = 'https://api.spotify.com/v1/search?' + 'q=' + searchString + '&type=' + searchType;
          makeGETCall(searchURL, searchType);
    }

    var makeGETCall = function (searchURL, searchType) {
      $http.get(searchURL)
          .then(setScope);
    };

    var setScope = function(response) {
        var searchType = $scope.searchType;
        $scope.searchResults = response.data[searchType + 's'].items;
    }



}]);