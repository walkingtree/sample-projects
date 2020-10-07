import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import './favorite_movies.dart';
import '../providers/movie_provider.dart';
import 'home_screen.dart';

class MainDrawer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Drawer(
      elevation: 2.0,
      child: Container(
        decoration: BoxDecoration(
          color: Colors.black87,
        ),
        child: Column(
          children: <Widget>[
            Container(
              padding: EdgeInsets.only(
                left: 20.0,
                top: 40.0,
              ),
              width: double.infinity,
              height: 100.0,
              color: Colors.red[600],
              child: Text(
                'Movies',
                style: Theme.of(context).textTheme.headline1,
              ),
            ),
            DrawerListTile(
                name: 'Home',
                icon: Icons.home,
                onTapHandler: () {
                  Navigator.pushNamed(context, HomeScreen.routeName);
                }),
            DrawerListTile(
                name: 'Favorites',
                icon: Icons.favorite,
                onTapHandler: () {
                  Navigator.popAndPushNamed(
                    //pushNamed(
                    context,
                    FavoriteMovies.routeName,
                  );
                }),
          ],
        ),
      ),
    );
  }
}

class DrawerListTile extends StatelessWidget {
  final String name;
  final IconData icon;
  final Function onTapHandler;

  const DrawerListTile({
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
              .copyWith(color: Theme.of(context).accentColor),
        ),
        trailing: (name == 'Favorites')
            ? Consumer<Movies>(
                builder: (context, movies, _) {
                  return Text(
                    movies.favCount.toString(),
                  );
                },
              )
            : null,
      ),
    );
  }
}
