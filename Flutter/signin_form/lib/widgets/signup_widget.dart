import 'package:flutter/material.dart';
import 'package:forms/signin_form/util/constants.dart';

class SignUpWidget extends StatelessWidget {
  const SignUpWidget({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          "Don't have an account?",
          style: kNoAccountTextSTyle,
        ),
        SizedBox(width: 8.0),
        FlatButton(
            child: Text(
              'Sign Up',
              style: kFlatButtonTextSTyle,
            ),
            onPressed: () {}),
      ],
    );
  }
}
