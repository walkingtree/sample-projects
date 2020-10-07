import 'package:flutter/foundation.dart';
import './../model/movie_model.dart';

class Movies extends ChangeNotifier {
  final List<MovieModel> _movies = [
    MovieModel(
      movieId: 'M1',
      movieName: 'The Godfather',
      posterUrl:
      'https://lunkiandsika.files.wordpress.com/2011/11/the-godfather-alternative-poster-1972-01.png',
    ),
    MovieModel(
      movieId: 'M2',
      movieName: 'The Notebook',
      posterUrl: 'http://www.impawards.com/2004/posters/notebook.jpg',
    ),
    MovieModel(
      movieId: 'M3',
      movieName: 'Little Woman',
      posterUrl: 'https://ekladata.com/LBj49PGJ-OZprEMVn-tNwuoq8j8@200x200.jpg',
    ),
    MovieModel(
      movieId: 'M4',
      movieName: 'Forrest Gump',
      posterUrl: 'https://galleries.collider.com/wp-content/uploads/2019/08/forrest-gump-bench.jpg',
    ),
    MovieModel(
      movieId: 'M5',
      movieName: 'Harry Potter',
      posterUrl: 'https://cdn.mos.cms.futurecdn.net/c630d2e738d3bb015c33a5a338108b21.jpg',
    ),
  ];

  List<MovieModel> get movies {
    return _movies;
  }

  int get movieCount {
    return _movies.length;
  }

  void updateFavorite(MovieModel movieItem) {
    movieItem.toggleFavorite();
    notifyListeners();
  }

  List<MovieModel> get favoriteMovies {
    return movies.where((movie) => movie.isFavorite).toList();
  }

  int get favCount {
    return favoriteMovies.length;
  }
}
