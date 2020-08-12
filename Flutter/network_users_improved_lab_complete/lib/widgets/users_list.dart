import 'package:flutter/material.dart';
import '../models/user_model.dart';

class UsersList extends StatelessWidget {
  final List<UserModel> users;

  UsersList(this.users);

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: users.length,
      itemBuilder: (context, index) {
        return Column(
          children: [
            ListTile(
              title: Text(
                users[index].name,
                style: Theme.of(context).textTheme.bodyText2,
              ),
              subtitle: Text(
                users[index].userName,
                style: Theme.of(context).textTheme.caption,
              ),
              trailing: SizedBox(
                width: 115,
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Icon(Icons.details, color: Colors.lightBlue),
                    Icon(Icons.photo_album, color: Colors.lightBlue),
                    Icon(Icons.delete, color: Colors.lightBlue),
                  ],
                ),
              ),
            ),
            Divider(
              color: Colors.black,
              indent: 10,
              endIndent: 10,
            ),
          ],
        );
      },
    );
  }
}
