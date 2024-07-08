# RFID Reader Integration in a Flutter Application

## What is RFID?
RFID (radio frequency identification) is a form of wireless communication. The RFID system consists of three components: a scanning antenna, a transceiver and a 
transponder. 

When the scanning antenna and transceiver are combined, they are referred to as an RFID reader. The RFID reader is a network-connected device that can
be portable or permanently attached. It uses radio waves to transmit signals that activate the tag. Once activated, the tag sends a wave back to the antenna, where
it is translated into data.

The transponder is in the RFID tag itself. 

## The Chainway R5 Wearable RFID Reader
* In the TeamTracker.AI application, we used the [Chainway R5 Wearable RFID Reader](https://www.chainway.net/Products/Info/59). 

* Equipped with an embedded Impinj E710 / R2000, it enables a read distance of over 14m. 

* It allows user information interaction via Bluetooth coordinated with an application or SDK. 

* It can be paired with Android/iOS devices both.

* It is suitable for warehousing, power inspection, asset management, retail, etc., which provides users with more flexibility to efficiently finish their tasks 
at hand. 


## Need of RFID Reader in the TeamTracker.AI Application
The TeamTracker.AI application is a sports application. Its Training Session module has a functionality to record the completion time of an athlete as he finishes 
a split. The coach clicked the start/stop button manually to either start or stop the split. We automated this functionality by using the RFID Reader. 

## Pre-requisites to use the RFID Reader

#### 1. Add Permissions

**For Android >= 8:** Add the following permissions in android/app/src/main/androidManifest.xml file.
 
  * \<uses-permission android:name="android.permission.BLUETOOTH\/\>

  * \<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"\/\>

**For Android >= 12:** These are the permission to be added in in android/app/src/main/androidManifest.xml file.

  * \<uses-permission android:name="android.permission.BLUETOOTH_ADMIN"\/\>

  * \<uses-permission android:name="android.permission.BLUETOOTH_SCAN"\/\>

  * \<uses-permission android:name="android.permission.BLUETOOTH_CONNECT"\/\>

#### 2. Handle Permissions
Add the [permission_handler](https://pub.dev/packages/permission_handler) Flutter package to handle permissions both on the native and frontend side.

#### 3. Handle Switching on of the Device Bluetooth
Once the permissions are granted, we need to switch on bluetooth on the users's device. We could have done this through native code but we used the [flutter_blue_plus](https://pub.dev/packages/flutter_blue_plus) package. This is crucial.

#### 4. Add the RFID API Library
We tried different Flutter packages to integrate the RFID Reader but nothing seemed to work with the Chainway R5 Reader. So we implemented the RFID functionality in our Flutter application by writing methods in Kotlin/Swift, which called methods of the library provided by Chainway. These methods communicated with the user's device to find the nearby devices, connect with the RFID reader, scan tags, etc., when they were called from the Flutter application. To achieve this, 

 1. Add this API library **DeviceAPI_ver20230301_release.aar** in the **android/app/lib** folder.
 2. Add its dependency in the **android/app/build.gradle** file like **implementation fileTree(dir: 'libs', include: ['*.aar', '*.jar'], exclude: [])**

## Set up the Native Side
1. We can write code to communicate with the device either in Kotlin or Swift (latest) for Android and iOS respectively. 
2. For Android, we wrote code in the android/app/src/main/kotlin/com/example/<project name> folder.
3. To start, firstly, we have to do some configuration in the MainActivity file like configuring the FlutterEngine, initializing the class which is containing code, e.g. RfidReaderPlugin, etc.
4. Secondly, we have to create a class, e.g., RfidReaderPlugin and write methods, which call methods from the added RFID library. These library methods do tasks like finding the nearby devices, make connection with the reader, get the reader's battery level, get and set its power level, scan tags, etc.
5. Thirdly, we have to create a MethodChannel instance, and pass some string as a unique identifier. This identifier creates a bridge between the native code and the Flutter code. For example,

   ```js
   channel = MethodChannel(flutterPluginBinding.binaryMessenger, "<application_name>/rfid_reader")
   ```

7. Fourthly, we have to configure a method handler for handling method calls from Flutter. 

   ```js
   channel.setMethodCallHandler(this)
   ```

   ```js
   override fun onMethodCall(@NonNull call: MethodCall, @NonNull result: Result) {
          when (call.method) {
             "findReaders" -> findReaders(result)
             "connect" -> connect(call.argument("address"), result)
             "disconnect" -> disconnect(result)
             "getPower" -> getPower(result)
             "setPower" -> setPower(call.argument("powerLevel"), result)
             "getBatteryLevel" -> getBatteryLevel(result)
          }
   }
   ```
   
## Set up the Flutter Side 
1. To execute the whole RFID process, we have to call methods written on the native side in our Flutter code.
2. Firstly, create a Method Channel instance in the Fllutter code, using the same unique identifier that was given in the native code. For example,

   ```js
   static const methodChannel = MethodChannel('<application_name>/rfid_reader');
   ```

3. Secondly, as per requirement, write Dart methods that use the MethodChannel instance created above, to invoke the native methods. For example,
    
   ```js
   static Future<bool> findReaders() async {
        try {   
       return await methodChannel.invokeMethod('findReaders');  
            } catch (e) { 
         rethrow;   
      } 
    }
   ```

 4. You can pass some data also while calling the native methods. Similarly, you can get back some result also from the method call.

## Call Flutter Methods from Native Side
If need be, you can call Flutter methods also from the native code. This is again done using the MethodChannel instance. 

## Clean the Resources
1. On Flutter side, before closing the UI, remember to dispose off resources like stop scanning of tags, closing the stream, disconnecting the reader, etc. 
2. On native side also, do a cleanup in the 'onDetachedFromEngine' method.

## MethodChannel vs EventChannel
MethodChannel allows two way communication between Flutter and native code but it is one-time only. It means that using MethodChannel, you can call native methods from Flutter and vice-versa but once the function call is complete and the function ends with some result, the communication also ends.

Therefore, if you want a continous stream of data from native to Flutter, e.g. continuous stream of tags, then use the EventChannel. 

## Common Pitfalls
While establishing communication between Flutter and native, you may make two very common mistakes.

1. Be sure that the unique identifier passed to the MethodChannel method in Flutter matches with the one used in the native code.
2. Be sure that the native method that you call from Flutter exists on the native side and its prtotype is same.

## Resources
[Writing custom platform-specific code](https://docs.flutter.dev/platform-integration/platform-channels)




