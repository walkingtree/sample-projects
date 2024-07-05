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

#### 3. Switch On the Devive Bluetooh
Once the permissions are granted, we need to switch on bluetooth on the users's device. We could have done this through native code but we used the [flutter_blue_plus](https://pub.dev/packages/flutter_blue_plus) package. This is crucial.

#### 4. Add the RFID API Library
We tried different Flutter packages to integrate the RFID Reader but nothing seemed to work with the Chainway R5 Reader. So we integrated this reader in Flutter by writing methods in Kotlin to call the APIs of the library provided by Chainway and then calling these methods in Flutter using the Method Channel. To achieve this, 

 1. Add this API library **DeviceAPI_ver20230301_release.aar** in the **android/app/lib** folder.
 2. Add its dependency in the **android/app/build.gradle** file like **implementation fileTree(dir: 'libs', include: ['*.aar', '*.jar'], exclude: [])**

## Setup on the Native Side
1. We can write this code in Kotlin or Java. We wrote in Kotlin in the android/app/src/main/kotlin/com/example/<project name> folder.
2. Firstly, do some configuration in the MainActivity file like configuring the FlutterEngine, initializing the class which is containing code, e.g. RfidReaderPlugin, etc.
3. Secondly, write code in the RfidReaderPlugin class to communicate with the Flutter application. This can be done by creating the MethodChannel instance and passing a string as a key. This key will be used to create a bridge between the native code and te Flutter application.

  channel = MethodChannel(flutterPluginBinding.binaryMessenger, "application_name/rfid_reader")

4. Thirdly, configure a method handler for handling method calls from Flutter. 

   channel.setMethodCallHandler(this)

   override fun onMethodCall(@NonNull call: MethodCall, @NonNull result: Result) {
        when (call.method) {
            "findReaders" -> findReaders(result)
            "connect" -> connect(call.argument("address"), result)
            "disconnect" -> disconnect(result)
            "getPower" -> getPower(result)
            "setPower" -> setPower(call.argument("powerLevel"), result)
            "getBatteryLevel" -> getBatteryLevel(result)

  }}
  


 
4. Thirdly, create a Method Channel instance in the Fllutter code also with the same key
  This 
6.
7. to bring native code to flutter and if there is a stream then use eventChannel.
4.to communicate with the reader like discovering nearby bluetooth devices, connecting with the reader, getting and setting the power level, getting the battery level, start scanning of tags, stop scanning of tags, disposing of resources, etc.
 
  

Each athlete is first assigned a tag. During the training session, while running a split, as soon as he comes in the range of an RFID Reader, his tag gets scanned 
and the start/stop button automatically gets clicked.





3.write native code language you known java/kotlin
Which you can find folder named as java/kotlin in android/app/src/main
4.Use methodChannel to bring native code to flutter and if there is a stream then use eventChannel.

Ex:- static const methodChannel = MethodChannel('appliction_name/rfid_reader');
static const EventChannel eventChannel =    EventChannel('application_name/tag_scanned');

 static Future<bool> findReaders() async {
     try {   
    return await methodChannel.invokeMethod('findReaders');  
         } catch (e) { 
      rethrow;   
   } 
  }

5.AND same method to call flutter code to Native.
channel = MethodChannel(flutterPluginBinding.binaryMessenger, "application_name/rfid_reader")




Though you can check that official doc for flutter blue plus for more information.

Remember to call dispose method when your work is complete:
In which you can call the stopScanning method and disconnect and clear all tags from memory.

There are different power Levels but we have use for the power level 1 and 30.
1.For power Level 1 you have to put a tag on the reader then it will scan.
2.For power Level 30 you have to keep reader in 14 m range and it scan all tags

Common Errors:-
1.When your method  name doesn’t match from native code to flutter 
object
E/flutter ( 4225): [ERROR:flutter/runtime/dart_vm_initializer.cc(41)] Unhandled Exception: MissingPluginException(No implementation found for method findReader on channel teamTracker.ai/rfid_reader)
E/flutter ( 4225): #0      MethodChannel._invokeMethod (package:flutter/src/services/platform_channel.dart:332:7)
E/flutter ( 4225): <asynchronous suspension>
E/flutter ( 4225): #1      RfidReader.findReaders (package:ttai_ui/utils/rfid_reader.dart:11:14)
E/flutter ( 4225): <asynchronous suspension>
E/flutter ( 4225): #2      new RfidTagsBloc.<anonymous closure> (package:ttai_ui/bloc/rfid_tags/rfid_tags_bloc.dart:125:9)
E/flutter ( 4225): <asynchronous suspension>
E/flutter ( 4225): #3      Bloc.on.<anonymous closure>.handleEvent (package:bloc/src/bloc.dart:229:13)
E/flutter ( 4225): <asynchronous suspension>
E/flutter ( 4225): 

2.If you miss the call the correct method name in native code onMethodCall than this error will come:

e: file:///D:/project/ttai_ui/android/app/src/main/kotlin/com/example/ttai_ui/RfidReaderPlugin.kt:97:32 Unresolved reference: clearSeenTag

FAILURE: Build failed with an exception.





