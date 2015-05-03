// Toteuta moduulisi tänne
var MyApp = angular.module('MyApp', ['ngRoute', 'firebase']);

MyApp.service('FirebaseService', function ($firebase) {
    var firebaseRef = new Firebase('https://fiery-fire-3593.firebaseio.com/movies')
    var sync = $firebase(firebaseRef);
    var movies = sync.$asArray();

    this.addMovie = function (name, director, year, description) {
        movies.$add({
            name: name,
            director: director,
            year: year,
            description: description
        });
    }
    this.getMovies = function () {
        return movies;
    }
});

MyApp.config(function ($routeProvider) {
    $routeProvider
            .when('/movies', {
                controller: 'MoviesController',
                templateUrl: 'views/list.html'
            })
            .when('/movies/new', {
                controller: 'MoviesController',
                templateUrl: 'views/add.html'
            })
            .when('/', {
                controller: 'MoviesController',
                templateUrl: 'views/list.html'
            })
});