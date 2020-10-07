import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:provider_example/screens/home_screen.dart';
import 'package:provider_example/screens/list_options.dart';
import 'package:provider_example/screens/login_screen.dart';
import 'util/movie_theme.dart';

import 'screens/movie_listview.dart';
import 'screens/main_drawer.dart';
import './screens/movie_listview.dart';
import './screens/main_drawer.dart';
import 'package:provider_example/screens/favorite_movies.dart';
import 'package:provider_example/providers/movie_provider.dart';
import './providers/auth_provider.dart';
import './screens/login_screen.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(
          create: (_) => Movies(),
        ),
        ChangeNotifierProvider(
          create: (_) => Auth(),
        ),
      ],
      child: MaterialApp(
          title: 'Flutter Demo',
          theme: movieTheme,
          home: LoginScreen(),
          routes: {
            FavoriteMovies.routeName: (context) => FavoriteMovies(),
            HomeScreen.routeName: (context) => HomeScreen(),
          }),
    );
  }
}

