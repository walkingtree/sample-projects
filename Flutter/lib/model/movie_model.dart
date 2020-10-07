import 'package:flutter/foundation.dart';

class MovieModel {
  String movieId;
  String movieName;
  bool isFavorite;
  String posterUrl;

  MovieModel({
    @required this.movieId,
    @required this.movieName,
    @required this.posterUrl,
    this.isFavorite = false,
  });

  void toggleFavorite() {
    isFavorite = !isFavorite;
  }
}
