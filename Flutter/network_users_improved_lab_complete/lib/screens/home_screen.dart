import 'package:flutter/material.dart';
import '../models/user_model.dart';
import '../widgets/users_list.dart';
import 'dart:async';
import '../services/api_service.dart';

class HomeScreen extends StatefulWidget {
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final baseUrl = 'https://jsonplaceholder.typicode.com';

  Future<dynamic> futureUsers;

  @override
  void initState() {
    super.initState();
    String url = '$baseUrl/users';
    futureUsers = ApiService(url: url).fetchData();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          'Users',
          style: TextStyle(
            color: Colors.white,
            fontSize: 28.0,
          ),
        ),
      ),
      body: Center(
        child: FutureBuilder(
          future: futureUsers,
          builder: (BuildContext context, AsyncSnapshot snapshot) {
            //If data is loaded and snapshot has data then parse JSON data to a list of UserModel
          // and render the UsersList widget.
            if (snapshot.hasData) {
              var parsedJsonList = snapshot.data;
              UsersModel userList = UsersModel.fromJsonList(parsedJsonList);
              return UsersList(userList.users);
            } else if (snapshot.hasError) {
              return Text(
                "${snapshot.error}",
              );
            }

            // By default, show a loading spinner.
            return CircularProgressIndicator(
              backgroundColor: Colors.lightBlue,
            );
          },
        ),
      ),
    );
  }
}
