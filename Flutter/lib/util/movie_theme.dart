import 'package:flutter/material.dart';


const kSecondaryColor = const Color(0xFFB71C1C);
final movieTheme = ThemeData.light().copyWith(
  primaryColor: Color(0xFF090C22),
   accentColor: Colors.white,
  scaffoldBackgroundColor: Color(0xFF090C22),
  appBarTheme: AppBarTheme(
    color: Colors.red[900],
    textTheme: TextTheme(
      headline6: TextStyle(
        fontSize: 24.0,
        fontWeight: FontWeight.w500,
      ),
     ),
  ),
  textTheme: TextTheme(
    bodyText2: TextStyle(
      fontSize: 22.0,
      fontWeight: FontWeight.w600,
    ),
    subtitle1: TextStyle(
      fontSize: 20.0,
      fontWeight: FontWeight.w600,
    ),
    headline1: TextStyle(
      color: Colors.white,
      fontSize: 28.0,
      fontWeight: FontWeight.w600,
    ),
    
  ),
);
