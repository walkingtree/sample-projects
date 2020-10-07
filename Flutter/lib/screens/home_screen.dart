import 'package:flutter/material.dart';

import 'list_options.dart';
import 'main_drawer.dart';
import 'movie_listview.dart';

class HomeScreen extends StatelessWidget {
  static final routeName = '/homeScreen';
  static const int tabletBreakpoint = 600;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(
            'Movies',
          ),
        ),
        drawer: MainDrawer(),
        body: MovieListView());
  }
}
