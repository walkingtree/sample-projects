import 'package:flutter/foundation.dart';

class Auth extends ChangeNotifier {
  bool _isAuth = false;

  bool get isAuth {
    return _isAuth;
  }

  Future<void> authenticate(String username, String password) async {
    if (username == 'user1@gmail.com' && password == '1234') {
      _isAuth = true;
      notifyListeners();
    } else {
      _isAuth = false;
    }
  }

  Future<void> logout() async {
    _isAuth = false;
    notifyListeners();
  }
}
