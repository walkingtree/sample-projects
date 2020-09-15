import 'package:flutter/material.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import '../util/constants.dart';

class OutlineButtonWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        OutlineButton.icon(
          icon: Icon(
            FontAwesomeIcons.facebook,
            color: Color(0xFFFF25356F),
            size: 20.0,
          ),
          label: Text(
            'Sign In',
            style: kOutlineButtonTextStyle,
          ),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(
              10.0,
            ),
          ),
          onPressed: () {},
        ),
        SizedBox(width: 8.0),
        OutlineButton.icon(
          icon: Icon(
            FontAwesomeIcons.googlePlus,
            color: Colors.red,
            size: 20.0,
          ),
          label: Text(
            'Sign In',
            style: kOutlineButtonTextStyle,
          ),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(
              10.0,
            ),
          ),
          onPressed: () {},
        ),
      ],
    );
  }
}
