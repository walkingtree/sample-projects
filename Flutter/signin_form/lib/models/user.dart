import 'dart:convert';

class UserModel {
  String email;
  String password;

  // Convert JSON String to a Dart object
  static UserModel fromJson(String jsonFeed) {
    UserModel user = UserModel();
    Map<String, dynamic> parsedJson = json.decode(jsonFeed);
    user.email = parsedJson['mail'];
    user.password = parsedJson['password'];
    return user;
  }

  //Convert Dart object to a String.
  String toJson() {
    Map<String, dynamic> mapData = Map();
    mapData["password"] = this.password;
    mapData["email"] = this.email;
    String jsonString = json.encode(mapData);
    return jsonString;
  }
}