import 'package:flutter/foundation.dart';

class UserModel {
  final int id;
  final String name;
  final String userName;
  final String email;
  final String phoneNumber;
  final Map<String, dynamic> address;
  final String website;
  final Map<String, dynamic> company;

  UserModel({
    this.id,
    this.name,
    this.userName,
    this.email,
    this.phoneNumber,
    this.address,
    this.website,
    this.company,
  });

  factory UserModel.fromJson(Map<String, dynamic> parsedJson) {
    return UserModel(
      id: parsedJson['id'],
      name: parsedJson['name'],
      userName: parsedJson['username'],
      email: parsedJson['email'],
      phoneNumber: parsedJson['phoneNumber'],
      address: parsedJson['address'],
      website: parsedJson['website'],
      company: parsedJson['company'],
    );
  }
}

class UsersModel {
  final List<UserModel> users;

  UsersModel({@required this.users});

  factory UsersModel.fromJsonList(List<dynamic> parsedJsonList) {
    List<UserModel> userList;
    userList = parsedJsonList.map((jsonObj) {
      return UserModel.fromJson(jsonObj);
    }).toList();
    return UsersModel(users: userList);
  }
}
