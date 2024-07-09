# Steps To implement Google Sign In.

1.First go to GCP(google cloud platform) https://console.cloud.google.com/ and create the account.

2.Than go to "Project" dropdown click on it to make your project by selecting a new project .

3.After making your project select your project from dropdown if it is not selected. 

4.After searching OAuth consent screen and do your setup according to your need.

5.When setup OAuth consent screen is setup you should go to your project and install a package

6.Google Sign in Package you can find from here https://pub.dev/packages/google_sign_in.

7. Make your own method or copy paste below method in dart file to call googleApi.

    ```  
    class LoginAPI {
      static final _googleSignIn = GoogleSignIn();
      static Future<GoogleSignInAccount?> login() => _googleSignIn.signIn();
      static Future signOut = _googleSignIn.signOut();
    }
    ```

8.call this method in google sign in button which you made in project with 

    ```
    future<void> googleSignIn() async {
                          try {
                            // Your Google Sign-In code here
                            final user = await LoginAPI.login();
                            if (user != null) {
                              print('hello: ');
                              print(user.displayName);
                              print(user.email);
                            } else {
                              ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(content: Text('Sign In Failed')));
                            }
                          } catch (e) {
                            print('Error during Google Sign-In: $e');
                          }
                        },
    ```

9.Now rerun your project and click your google sign in button it will give you error with ```platformException(sign in failed,com.android.gms.common.apiexception 12500 )```

10.So for that you have to wait and first check that java path is set on env because we are going to use one keytool cmd

11. If not install java jdk in your system if it is, install the skip.

12. Set jdk environment variable on system variable by creating a new one 

    ```
    name:- JAVA_HOME
    path:-C:\Program Files\Java\jdk-21
    ```

13.click okay and edit path of system variable %JAVA_HOME%\bin and click okay okay okay

14.Now your environment variable is set 

15.Now run this cmd keytool -genkey -v -keystore C:\Users\your_username\myKey.jks -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 -alias androiddebugkey
create your own password.

When whole setup is done you will get this one file C:\Users\your_username with this name mykey.jks just copy paste in yourproject\android\app

16. Now go android\app open build.gradle and in that android section copy this above build types

    ```    
    signingConfigs {
            debug {
                keyAlias 'androiddebugkey'
                keyPassword '123456'
                storeFile file('myKey.jks')
                storePassword '123456'
            }
        }
    ```

17. And replace your password with keyPassword and store password make debug which is release in build type

18. After that restart your application click google sign in and it will give you this error:

    ```platformException(signinfailed,com.android.gms.common.apiexception 10 )```
    
  which tells you get ssh-1 set on your api credential on GCP

19.Now you should open GCP and search for credential and click create new credential

20.Select platform for which you want to setup and create after go build.gradle of android\app find application id take string value copy paste in package name.

21. Check the path it should be yourproject\android and then run this cmd:-
    
  ```keytool -keystore app\myKey.jks -list -v```
  
now you will get one sha -1 then copy paste in GCP sha-1 and click on create.

23. Now rerun your project and Now you can successfully login with google.


# Configuration for the web.

Go in GCP and search credentials, select create credentials and select web option and do below's setup. if your using visual studio click on debug on left side and select setting edit configuration

1. In that copy this code after type: 'dart'
   
    ```"args": ["--web-port","5000"]```
   
If your using android studio click on main.dart on top drop down and select edit configuration it will open one window in that

    1.--web-port=5000 copy this in addition run args:

# Configuration for the iOS.
1.Go to GCP and search credential and create credential for iOS and copy client id 

2.copy this 

```
<!-- Put me in the [my_project]/ios/Runner/Info.plist file -->
<!-- Google Sign-in Section -->
<key>CFBundleURLTypes</key>
<array>
   <dict>
      <key>CFBundleTypeRole</key>
      <string>Editor</string>
      <key>CFBundleURLSchemes</key>
      <array>
         <!-- TODO Replace this value: -->
         <!-- Copied from GoogleService-Info.plist key REVERSED_CLIENT_ID -->
         <string>com.googleusercontent.apps.327973494088-068lfobrhavt596eom86t3vc7idf8e79</string>
      </array>
   </dict>
</array>
<!-- End of the Google Sign-in Section -->
```

And put in info.plist below <dict>

Remember clientId that you copied you have paste in the google services function which you have make in client id property

```
import 'package:google_sign_in/google_sign_in.dart';
class LoginAPI {
 static final GoogleSignIn _googleSignIn =
 GoogleSignIn(forceCodeForRefreshToken: true,clientId: "327973494088-068lfobrhavt596eom86t3vc7idf8e79.apps.googleusercontent.com");
 static Future<GoogleSignInAccount?> login() async {
   await _googleSignIn.signOut(); // Sign out before initiating login
   return _googleSignIn.signIn();
 }


 static Future signOut() {
   return _googleSignIn.signOut();
 }


 static Future disconnect() {
   return _googleSignIn.disconnect();
 }


 static Future<void>? clearCache = _googleSignIn.currentUser!.clearAuthCache();
}
```

And stop and rerun the whole program.it should start working
