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
    
    this.getMovie = function (id, done) {
        movies.$loaded(function () {
            done(movies.$getRecord(id)); 
        });
    };
    
    this.editMovie = function (movie) {
        movies.$save(movie);
    };
    
    this.removeMovie = function (movie) {
        movies.$remove(movie);
    };
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
            .when('/movies/:id', {
                controller: 'MovieController',
                templateUrl: 'views/show.html'
            })
            .when('/movies/:id/edit', {
                controller: 'MovieController',
                templateUrl: 'views/edit.html'
            })
            .otherwise({
                redirectTo: '/movies'
            })
});