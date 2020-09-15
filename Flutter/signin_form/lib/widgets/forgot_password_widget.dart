import 'package:flutter/material.dart';

class ForgotPasswordWidget extends StatelessWidget {
  const ForgotPasswordWidget({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return FlatButton(
      child: Text(
        'Forgot password?',
        style: TextStyle(
          color: Color(0xFFFF25356F),
          fontSize: 16.0,
          fontWeight: FontWeight.w800,
        ),
      ),
      onPressed: () {},
    );
  }
}
