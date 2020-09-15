import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import '../util/constants.dart';
import '../widgets/forgot_password_widget.dart';
import '../widgets/outline_button_widget.dart';
import '../widgets/signup_widget.dart';
import '../mixins/validation_mixin.dart';
import '../models/user.dart';
import '../services/user_service.dart';

class FormWidget extends StatefulWidget {
  @override
  _FormWidgetState createState() => _FormWidgetState();
}

class _FormWidgetState extends State<FormWidget> with ValidationMixin {
  FocusNode _passwordFocusNode;
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();
  UserModel user = UserModel(); //Its properties are set when form  saved.

  @override
  void initState() {
    super.initState();
    _passwordFocusNode = FocusNode();
  }

  @override
  void dispose() {
    // Clean up the focus node when the Form is disposed.
    _passwordFocusNode.dispose();
    super.dispose();
  }

  //Show a Snackbar when form save is successful
  void showSaveMessage(context, String message) {
    Scaffold.of(context).showSnackBar(
      SnackBar(
        backgroundColor: kprimaryColor,
        content: Text(message),
      ),
    );
  }

  // Saving of form and handling the respose.
  Future<void> submitForm(context) async {
    print('Form is valid');
    //Calls onSaved() on all the fields.
    _formKey.currentState.save();
    UserService userService = UserService();
    //Send Form data to the backend.
    UserModel userSaveResponse = await userService.createUser(user);
    //Show Save status.
    if (userSaveResponse != null) {
      showSaveMessage(context, 'New User Created!');
    } else {
      showSaveMessage(context, 'Request Failed!');
    }
  }

  // Show error Dialog if form is invalid.
  isFormInvalid(context) {
    return showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
            title: Text('Error!'),
            content: Text('Email or Passord is incorrect'),
            actions: [
              FlatButton(
                  child: Text('OK'),
                  onPressed: () {
                    //_formKey.currentState.reset();
                    Navigator.pop(context);
                  }),
            ],
          );
        });
  }

  //Handle Form validation. Save form if it's valid and show error dialog if it's invalid.
  void onValidate(BuildContext context) async {
    if (_formKey.currentState.validate()) {
      await submitForm(context);
    } else {
      isFormInvalid(context);
    }
  }

  //Build the Form SignIn button.
  Widget buildSignInButton(context) {
    return RaisedButton(
        elevation: 2.0,
        color: kprimaryColor,
        splashColor: kButtonSplashColor,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(
            30.0,
          ),
        ),
        child: Container(
          height: 50.0,
          alignment: Alignment.center,
          child: Text(
            'Sign In',
            style: kHintTextStyle,
          ),
        ),
        onPressed: () {
          onValidate(context);
        });
  }

  
  //Decoration for the text fields.
  InputDecoration styleTextfield(String hint) {
    return InputDecoration(
      filled: true,
      fillColor: kTextFieldFillColor,
      hintText: (hint == 'email') ? 'Email' : 'Password',
      hintStyle: kHintTextStyle,
      contentPadding: EdgeInsets.symmetric(vertical: 15.0, horizontal: 20),
      border: OutlineInputBorder(
        borderSide: BorderSide.none,
        borderRadius: BorderRadius.all(
          Radius.circular(30.0),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        padding: EdgeInsets.fromLTRB(20.0, 30.0, 20.0, 0.0),
        decoration: BoxDecoration(
          color: Color(0xFFFFFFFFFF),
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(25.0),
            topRight: Radius.circular(25.0),
          ),
        ),
        child: Form(
          key: _formKey,
          autovalidate: false,
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.stretch,
              children: [
                TextFormField(
                  autofocus: true,
                  decoration: styleTextfield('email'),
                  keyboardType: TextInputType.emailAddress,
                  onFieldSubmitted: (value) =>
                      _passwordFocusNode.requestFocus(),
                  validator: validateEmail,
                  onSaved: (value) => user.email = value,
                ),
                SizedBox(height: 15.0),
                TextFormField(
                  focusNode: _passwordFocusNode,
                  obscureText: true,
                  obscuringCharacter: '*',
                  decoration: styleTextfield('password'),
                  keyboardType: TextInputType.visiblePassword,
                  inputFormatters: [
                    LengthLimitingTextInputFormatter(10),
                    FilteringTextInputFormatter.allow(RegExp("[a-zA-Z0-9#.]")),
                  ],
                  validator: validatePassword,
                  onSaved: (value) => user.password = value,
                ),
                SizedBox(height: 15.0),
                buildSignInButton(context),
                SizedBox(height: 10.0),
                ForgotPasswordWidget(),
                SizedBox(height: 25.0),
                OutlineButtonWidget(),
                SizedBox(width: 10.0),
                SignUpWidget(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
