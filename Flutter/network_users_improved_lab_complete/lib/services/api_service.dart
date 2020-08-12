import 'package:http/http.dart' as http;
import 'package:flutter/foundation.dart';
import 'dart:convert';

class ApiService {
  String url;

  ApiService({@required this.url});

  Future fetchData() async {
    // Make a request.
    final http.Response response = await http.get(url);

    if (response.statusCode == 200) {
      // If the server did return a 200 OK response,
      // then parse the JSON and return it.
      var parsedJson = json.decode(response.body);
      print(parsedJson);
      return parsedJson;
    } else {
      // If the server did not return a 200 OK response,
      // then throw an exception.
      throw Exception(
          'Failed to load data. \n \n Status Code: ${response.statusCode}');
    }
  }
}

//return Album.fromJson(json.decode(response.body));
