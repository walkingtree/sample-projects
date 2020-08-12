import 'package:flutter/material.dart';

final appTheme = ThemeData.light().copyWith(
    primaryColor: Colors.lightBlue,
    accentColor: Colors.white,
    appBarTheme: AppBarTheme(
      color: Colors.lightBlue,
      textTheme: TextTheme(
        headline6: TextStyle(
          fontSize: 24.0,
          fontWeight: FontWeight.w500,
        ),
      ),
    ),
    textTheme: TextTheme(
      bodyText1: TextStyle(
        fontSize: 20.0,
        fontWeight: FontWeight.w600,
        color: Colors.white,
      ),
      bodyText2: TextStyle(
        fontSize: 18.0,
        fontWeight: FontWeight.w600,
        color: Colors.black,
      ),
      caption: TextStyle(
        fontSize: 12.0,
        fontWeight: FontWeight.w500,
        color: Colors.black,
      ),
      headline1: TextStyle(
        color: Colors.white,
        fontSize: 28.0,
        fontWeight: FontWeight.w600,
      ),
    ),
    buttonTheme: ButtonThemeData(
      padding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 20.0),
      buttonColor: Colors.lightBlue,
    ));
