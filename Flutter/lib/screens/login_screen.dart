import 'package:provider/provider.dart';
import 'package:flutter/material.dart';
import './../providers/auth_provider.dart';
import './home_screen.dart';

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final emailTextController = TextEditingController();
  final pswdTextController = TextEditingController();
  final GlobalKey<ScaffoldState> _scaffoldKey = new GlobalKey<ScaffoldState>();
  final _formEmailKey = GlobalKey<FormState>();
  Auth _auth;

  static const int tabletBreakpoint = 600;

  @override
  void dispose() {
    emailTextController.dispose();
    pswdTextController.dispose();
    super.dispose();
  }

  Future<void> getEmailVerify(BuildContext context) async {
    await _auth.authenticate(emailTextController.text, pswdTextController.text);
  }

  @override
  Widget build(BuildContext context) {
    _auth = Provider.of<Auth>(context, listen: false);
    return Form(
      key: _formEmailKey,
      child: Scaffold(
        key: _scaffoldKey,
        body: SafeArea(
          child: SingleChildScrollView(
            child: Container(
              padding: EdgeInsets.only(
                top: 10,
                left: 0,
                right: 0,
                bottom: 10,
              ),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.start,
                children: <Widget>[
                  Container(
                    width: double.infinity,
                    height: 150,
                    alignment: Alignment.center,
                    child: Text(
                      "WELCOME!",
                      style: TextStyle(
                        color: Colors.red[900],
                        fontSize: 48.0,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ),
                  SizedBox(
                    height: 20,
                  ),
                  Card(
                    elevation: 20,
                    child: Container(
                      width: 300,
                      height: 250,
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.start,
                        crossAxisAlignment: CrossAxisAlignment.stretch,
                        children: <Widget>[
                          SizedBox(
                            height: 20,
                          ),
                          Container(
                            height: 70,
                            padding: EdgeInsets.symmetric(
                                vertical: 10, horizontal: 20),
                           child: TextFormField(
                              controller: emailTextController,
                              keyboardType: TextInputType.emailAddress,
                              style: TextStyle(
                                color: Colors.black,
                              ),
                              decoration: InputDecoration(
                                prefixIcon: Icon(Icons.mail),
                                hintText: "Email",
                              ),
                              validator: (value) {
                                String p =
                                    r'^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$';
                                RegExp regExp = new RegExp(p);
                                if (regExp.hasMatch(value)) {
                                  return null;
                                } else if (value.isEmpty) {
                                  return 'Please Enter Email';
                                }
                                return 'Please enter valid Email';
                              },
                            ),
                          ),
                          SizedBox(
                            height: 20,
                          ),
                        Container(
                            height: 50,
                            padding: EdgeInsets.symmetric(
                                vertical: 10, horizontal: 20),
                            child: TextFormField(
                              controller: pswdTextController,
                              obscureText: true,
                              style: TextStyle(
                                color: Colors.black,
                              ),
                              decoration: InputDecoration(
                                  prefixIcon: Icon(Icons.lock),
                                  hintText: "Password"),
                              validator: (value) {
                                if (value.isEmpty) {
                                  return 'Please Enter Password';
                                }
                                return null;
                              },
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  SizedBox(height: 30),
                  RaisedButton(
                    textColor: Colors.white,
                    color: Colors.red[900],
                    child: Padding(
                      padding: const EdgeInsets.symmetric(
                          horizontal: 28.0, vertical: 12.0),
                      child: Text(
                        "LOGIN",
                        style: TextStyle(
                          fontSize: 26,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                    onPressed: () {
                      final form = _formEmailKey.currentState;
                      if (form.validate()) {
                        getEmailVerify(context);
                        (_auth.isAuth == true)
                            ? Navigator.pushNamed(context, HomeScreen.routeName)
                            : showInSnackBar(
                                'Sorry! Enter correct credentials.');
                      }
                    },
                    shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(30)),
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  void showInSnackBar(value) {
    _scaffoldKey.currentState.showSnackBar(
      new SnackBar(
        content: new Text(
          value,
          style: TextStyle(fontSize: 18.0),
        ),
        duration: Duration(seconds: 1),
        backgroundColor: Colors.red[900],
      ),
    );
  }
}


