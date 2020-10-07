import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import './../providers/movie_provider.dart';
import './../model/movie_model.dart';

class MovieTile extends StatelessWidget {
  final int movieIndex;

  MovieTile({
    @required this.movieIndex,
  });

  @override
  Widget build(BuildContext context) {
    return Consumer<Movies>(
      builder: (context, movies, child) {
        MovieModel movie = movies.movies[movieIndex];
        return ListTile(
          title: Text(
            movie.movieName,
            style: (movie.isFavorite)
                ? TextStyle(color: Colors.white)
                : TextStyle(color: Colors.white54),
          ),
          trailing: IconButton(
            icon: (movie.isFavorite)
                ? Icon(
                    Icons.favorite,
                    color: Colors.red,
                  )
                : Icon(
                    Icons.favorite_border,
                    color: Colors.red,
                  ),
            onPressed: () {
              Provider.of<Movies>(context, listen: false).updateFavorite(movie);
            },
          ),
        );
      },
    );
  }
}
