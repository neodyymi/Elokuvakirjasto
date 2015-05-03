MyApp.controller('MovieController', function ($scope, FirebaseService, $location, $routeParams) {

    FirebaseService.getMovie($routeParams.id, function(movie){
       $scope.movie = movie; 
    });
    
    $scope.editMovie = function (movie) {
        FirebaseService.editMovie(movie);
        $location.path('/movies/' + $routeParams.id);
    };
    
    
    $scope.removeMovie = function (movie) {
        FirebaseService.removeMovie(movie);
        $location.path('/movies/');
    }
    
});