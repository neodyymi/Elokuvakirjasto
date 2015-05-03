MyApp.controller('MoviesController', function ($scope, FirebaseService, $location) {
    $scope.movies = FirebaseService.getMovies();

    $scope.addMovie = function () {
        if($scope.name === "" || $scope.director === "" || $scope.year === "" || $scope.description === "") {
            return;
        };
        FirebaseService.addMovie($scope.name, $scope.director, $scope.year, $scope.description);
        $scope.name = '';
        $scope.director = '';
        $scope.year = '';
        $scope.description = '';

        $location.path('/movies');
    };
    
    
})
