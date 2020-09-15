import 'package:flutter/material.dart';
import '../widgets/form_widget.dart';

class SignInScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0XFFFFC7E8FF),
      body: SafeArea(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: <Widget>[
            Container(
              height: 200.0,
              width: double.infinity,
              decoration: BoxDecoration(
                image: DecorationImage(
                  image: AssetImage('assets/images/fitness.jpg'),
                  fit: BoxFit.cover,
                ),
              ),
              child: null,
            ),
            FormWidget(),
          ],
        ),
      ),
    );
  }
}
