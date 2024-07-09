## Step 1: Install Required Software
1. **Download Flutter**, **Android Studio**, and **Xcode** for the simulator.

## Step 2: Unzip Flutter SDK
1. Unzip Flutter:
    - Open Finder and unzip Flutter in the `user/development` directory. If the `development` folder does not exist, create it.

## Step 3: Configure Environment
1. Follow Flutter docs for macOS iOS setup.
2. In Terminal, open your shell profile with:
    ```sh
    nano ~/.zshenv
    ```
3. Add the following export statements:
    ```sh
    export PATH="$PATH:[path_to_flutter]/flutter/bin"
    ```
4. Save and refresh the terminal:
    ```sh
    source ~/.zshenv
    ```

## Step 4: Configure Android Studio
1. Set up the required path for Flutter and Dart in Android Studio.
2. Install the following plugins:
    - Flutter
    - Dart
    - Flutter Intl

## Step 5: Install CocoaPods
1. Open Terminal and run:
    ```sh
    sudo gem install cocoapods
    ```
2. If you encounter read permission errors for Ruby, run:
    ```sh
    sudo chmod -R 775 /System/Library/Frameworks/Ruby.framework/Versions/2.6/usr/lib/ruby/gems/2.6.0
    ```
3. Retry installing CocoaPods:
    ```sh
    sudo gem install cocoapods
    ```

## Step 6: Verify Installations
1. Check Ruby and CocoaPods versions:
    ```sh
    ruby --version
    pod --version
    ```
2. Alternatively, for CocoaPods, use:
    ```sh
    sudo pod --version
    ```

## Step 7: Additional CocoaPods Setup
1. To install CocoaPods for ARM architecture:
    ```sh
    arch -arm64 brew install cocoapods
    ```
2. To install a specific version of CocoaPods:
    ```sh
    sudo gem install cocoapods -v 1.10.0
    ```
3. To view the gem environment:
    ```sh
    gem environment
    ```
4. To update the gem system:
    ```sh
    gem update --system
    ```
5. If the above command does not work, use:
    ```sh
    sudo gem update --system
    ```
6. Update CocoaPods repositories:
    ```sh
    pod repo update
    ```

## Step 8: Troubleshooting
1. If issues persist, verify your installations and update to the latest versions.
2. Uninstall and reinstall CocoaPods with the required version:
    ```sh
    sudo gem uninstall cocoapods
    sudo gem install cocoapods -v 1.12.0
    ```

## Step 9: UTF-8 Encoding Issues
1. Check the current locale:
    ```sh
    locale
    ```
2. If the locale is empty, set it to UTF-8:
    ```sh
    export LANG=en_US.UTF-8
    sudo nano /etc/default/locale
    ```
3. Ensure the locale is correctly set in profile files:
    ```sh
    nano ~/.profile
    export LANG=en_US.UTF-8
    nano ~/.bash_profile
    export LANG=en_US.UTF-8
    nano ~/.zshrc
    export LANG=en_US.UTF-8
    ```
4. Apply the changes:
    ```sh
    source ~/.profile
    source ~/.bash_profile
    source ~/.zshrc
    ```

## Step 10: Install Pods for Flutter Project
1. Run the following commands in your Flutter project directory:
    ```sh
    RUBYOPT="-EUTF-8" pod install
    pod init
    ```

## Final Step: Run the Flutter App
1. Your Flutter app should now run successfully.
