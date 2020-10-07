import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import './favorite_movies.dart';
import '../providers/movie_provider.dart';

class ListOptions extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Material(
      elevation: 20.0,
      shadowColor: Colors.white70,
      child: Column(
            children: <Widget>[

          ListOptionsTile(
                  name: 'Favorites',
                  icon: Icons.favorite,
                  onTapHandler: () {
                    Navigator.pushNamed(
                      context,
                      FavoriteMovies.routeName,
                    );
                  }),
            ],
         // ),
       // ),
      ),
    );
  }
}

class ListOptionsTile extends StatelessWidget {
  final String name;
  final IconData icon;
  final Function onTapHandler;

  const ListOptionsTile({
    this.name,
    this.icon,
    this.onTapHandler,
  });

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTapHandler,
      child: ListTile(
        contentPadding: EdgeInsets.fromLTRB(15.0, 20.0, 20.0, 0.0),
        leading: Icon(
          icon,
          color: Colors.red[600],
          size: 30.0,
        ),
        title: Text(
          name,
          style: Theme.of(context)
              .textTheme
              .bodyText2
              .copyWith(color: Theme.of(context).primaryColor),
        ),
        trailing: (name == 'Favorites')
            ? Consumer<Movies>(
          builder: (context, movies, _) {
            return Text(
              movies.favCount.toString(),
              style: Theme.of(context)
                  .textTheme
                  .bodyText2
                  .copyWith(color: Theme.of(context).primaryColor),
            );
          },
        )
            : null,
      ),
    );
  }
}
