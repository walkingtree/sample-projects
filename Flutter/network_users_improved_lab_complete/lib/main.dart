import 'package:flutter/material.dart';
import './utilities/theme.dart';
import './screens/home_screen.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Networking',
      theme: appTheme,
      home: HomeScreen(),
    );
  }
}

