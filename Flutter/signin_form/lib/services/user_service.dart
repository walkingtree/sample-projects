import 'package:http/http.dart' as http;
import '../models/user.dart';

class UserService {
  //Test backend service
  static const _url = 'http://mockbin.org/echo';
  static final _headers = {'Content-Type': 'application/json'};

  // Called when form is valid and saved.
  Future<UserModel> createUser(UserModel user) async {
    try {
      //Convert Dart object(user) to a JSON string for passing over network.
      String jsonString = user.toJson();
      //Send form data string to backend service.
      final http.Response response =
          await http.post(_url, headers: _headers, body: jsonString);
      //Convert JSON String response to Dart object(UserModel) since this service returns back what we send.
      UserModel userSaveResponse = UserModel.fromJson(response.body);
      return userSaveResponse;
    } catch (e) {
       return null;
    }
  }
}
