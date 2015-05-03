describe('Add movie', function () {
    var controller, scope;

    var FirebaseServiceMock;

    beforeEach(function () {
        // Lisää moduulisi nimi tähän
        module('MyApp');

        FirebaseServiceMock = (function () {
            var movies = [];
            return {addMovie: function (name, year, director, description) {
                    movies.push({name: name, year: year, director: director, description: description});
                },
                getMovies: function () {
                    return movies;
                }
            }
        })();

        // Lisää vakoilijat
        // spyOn(FirebaseServiceMock, 'jokuFunktio').and.callThrough();
        spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();
        spyOn(FirebaseServiceMock, 'addMovie').and.callThrough();
        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('MoviesController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock
            });
        });
    });

    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */

    /*
     * Testaa, että käyttäjä pystyy lisäämään elokuvan oikeilla tiedoilla.
     * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
     * on kutsutta oikeaa funktiota lisäämällä siihen vakoilijan ja käyttämällä
     * toBeCalled-oletusta.
     */
    it('should be able to add a movie by its name, director, release date and description', function () {
        var movie = {name: "Elokuva", director: "Kevin Bacon", year: "2022", description: "It's a movie about a goat"}
        expect(scope.movies.length).toBe(0);
        scope.name = movie.name;
        scope.director = movie.director;
        scope.year = movie.year;
        scope.description = movie.description;
        scope.addMovie();
        expect(scope.movies.length).toBe(1);
        expect(FirebaseServiceMock.addMovie()).toHaveBeenCalled();
    });

    /*	
     * Testaa, ettei käyttäjä pysty lisäämään elokuvaa väärillä tiedoilla.
     * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
     * EI kutsuta funktiota, joka hoitaa muokkauksen. Voit käyttää siihen
     * not.toBeCalled-oletusta (muista not-negaatio!).
     */
    it('should not be able to add a movie if its name, director, release date or description is empty', function () {
        var movie = {name: "Elokuva", director: "Kevin Bacon", year: "2022", description: "It's a movie about a goat"}
        expect(scope.movies.length).toBe(0);
        scope.name = movie.name;
        scope.addMovie();
        expect(scope.movies.length).toBe(0);
        scope.director = movie.director;
        scope.addMovie();
        expect(scope.movies.length).toBe(0);
        scope.year = movie.year;
        scope.addMovie();
        expect(scope.movies.length).toBe(0);
        expect(FirebaseServiceMock.addMovie()).toNotHaveBeenCalled();
        scope.description = movie.description;
        scope.addMovie();
        expect(scope.movies.length).toBe(1);
        expect(FirebaseServiceMock.addMovie()).toHaveBeenCalled();
    });
});