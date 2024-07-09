# Implementing Google Sign-In in Flutter

## Setting up Google Cloud Platform (GCP)

1. **Create an account on GCP**: Go to [Google Cloud Platform](https://console.cloud.google.com/) and create an account.
2. **Create a new project**: Click on the "Project" dropdown and select "New Project" to create your project.
3. **Select your project**: Make sure your newly created project is selected from the dropdown.
4. **Set up OAuth consent screen**: Search for "OAuth consent screen" and set it up according to your needs.

## Adding Google Sign-In to your Flutter project

1. **Install the Google Sign-In package**: Add the [Google Sign-In package](https://pub.dev/packages/google_sign_in) to your project by running:
    ```sh
    flutter pub add google_sign_in
    ```

2. **Create a method for Google Sign-In**:
    ```dart
    import 'package:google_sign_in/google_sign_in.dart';

    class LoginAPI {
      static final _googleSignIn = GoogleSignIn();

      static Future<GoogleSignInAccount?> login() => _googleSignIn.signIn();
      static Future signOut = _googleSignIn.signOut();
    }
    ```

3. **Call the Google Sign-In method**:
    ```dart
    Future<void> googleSignIn() async {
      try {
        // Your Google Sign-In code here
        final user = await LoginAPI.login();
        if (user != null) {
          print('Hello: ');
          print(user.displayName);
          print(user.email);
        } else {
          ScaffoldMessenger.of(context).showSnackBar(
              SnackBar(content: Text('Sign In Failed')));
        }
      } catch (e) {
        print('Error during Google Sign-In: $e');
      }
    }
    ```

## Handling errors and setting up environment

1. **Error: PlatformException(sign in failed, com.android.gms.common.api.ApiException: 12500)**

    - Ensure Java is installed and the path is set in the environment variables.
    - If not installed, download and install Java JDK.
    - Set the JDK environment variable:

        **Variable Name:** `JAVA_HOME`  
        **Variable Path:** `C:\Program Files\Java\jdk-21`

    - Edit the `Path` system variable to include `%JAVA_HOME%\bin`.

2. **Generate a keystore file**:
    ```sh
    keytool -genkey -v -keystore C:\Users\your_username\myKey.jks -storetype JKS -keyalg RSA -keysize 2048 -validity 10000 -alias androiddebugkey
    ```
    - Create a password and complete the setup. This will generate `myKey.jks` in `C:\Users\your_username`.

3. **Copy the keystore file**: Move `myKey.jks` to `yourproject\android\app`.

4. **Update `build.gradle`**:
    ```gradle
    android {
        ...
        signingConfigs {
            debug {
                keyAlias 'androiddebugkey'
                keyPassword '123456'
                storeFile file('myKey.jks')
                storePassword '123456'
            }
        }
        buildTypes {
            debug {
                signingConfig signingConfigs.debug
            }
        }
    }
    ```
    - Replace the `keyPassword` and `storePassword` with your actual passwords.

5. **Error: PlatformException(signinfailed, com.android.gms.common.api.ApiException: 10)**

    - Open GCP and create new credentials.
    - Select the platform (Android) and create the credentials.
    - In `android\app\build.gradle`, find the application ID and copy it.
    - Run:
        ```sh
        keytool -keystore app\myKey.jks -list -v
        ```
    - Copy the SHA-1 fingerprint and add it to your GCP credentials.

## Configurations for Web

1. **Create web credentials**: In GCP, create credentials for the web.
2. **Update the configuration**:
    - If using Visual Studio Code, edit `launch.json`:
        ```json
        "args": ["--web-port", "5000"]
        ```
    - If using Android Studio, edit the run configuration:
        ```sh
        --web-port=5000
        ```

## Configurations for iOS

1. **Create iOS credentials**: In GCP, create credentials for iOS and copy the client ID.
2. **Update `Info.plist`**:
    ```xml
    <!-- Google Sign-in Section -->
    <key>CFBundleURLTypes</key>
    <array>
      <dict>
        <key>CFBundleTypeRole</key>
        <string>Editor</string>
        <key>CFBundleURLSchemes</key>
        <array>
          <!-- Replace this value with the client ID -->
          <string>com.googleusercontent.apps.327973494088-068lfobrhavt596eom86t3vc7idf8e79</string>
        </array>
      </dict>
    </array>
    <!-- End of the Google Sign-in Section -->
    ```

3. **Update the Google Sign-In method**:
    ```dart
    import 'package:google_sign_in/google_sign_in.dart';

    class LoginAPI {
      static final GoogleSignIn _googleSignIn = GoogleSignIn(
        forceCodeForRefreshToken: true,
        clientId: "327973494088-068lfobrhavt596eom86t3vc7idf8e79.apps.googleusercontent.com"
      );

      static Future<GoogleSignInAccount?> login() async {
        await _googleSignIn.signOut(); // Sign out before initiating login
        return _googleSignIn.signIn();
      }

      static Future signOut() => _googleSignIn.signOut();

      static Future disconnect() => _googleSignIn.disconnect();

      static Future<void>? clearCache = _googleSignIn.currentUser!.clearAuthCache();
    }
    ```

4. **Restart and run your application**.

By following these steps, you should be able to implement Google Sign-In in your Flutter project successfully.
