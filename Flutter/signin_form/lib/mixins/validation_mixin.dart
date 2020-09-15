class ValidationMixin {
  //Email must not be empty and match this format
  String validateEmail(String value) {
    final RegExp regex = new RegExp(
        r"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$");
    if(value.isEmpty){
       return 'Email is required.';
    } else if (regex.hasMatch(value) == false) {
      return 'Please enter a valid email address.';
    } else {
      return null;
    }
  }

  //Passord is required and cannot be less than 5 characters
  String validatePassword(String value) {
    if(value.isEmpty) {
      return 'Password is required.';
    } else if (value.length < 5) {
      return 'Password cannot be less than 8 characters.';
    } else {
      return null;
    }
  }
}
