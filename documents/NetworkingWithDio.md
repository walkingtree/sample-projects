# Dio Package for Networking in Flutter

Dio is a powerful HTTP networking package for Dart/Flutter, offering extensive features like global configuration, interceptors, form data handling, request cancellation, file uploading/downloading, timeout handling, custom adapters, transformers, and more.

## Some of the Methods provided by Dio

1. Get

2. Post

3. Put

4. Patch

5. Download

6. Delete

7. Upload (utilizes the post method)


## Get Method

1. First install dio package in flutter with commandl - `flutter pub add dio`.

2. Copy the code given below for the get method, then understanding of dio is going to be easy. 


  ```
  import 'package:dio/dio.dart';
  import 'package:flutter/material.dart';
  ```

  ```
  void main(){
      runApp(const MyApp());
  }
  ```
  
  ```
  class MyApp extends StatelessWidget {
   const MyApp({Key? key}) : super(key: key);
   @override
   Widget build(BuildContext context) {
      return MaterialApp(
        home: Scaffold(
          body: Center(
          child: Column(
             mainAxisAlignment: MainAxisAlignment.center,
             children: [
                TextButton(onPressed: (){
                   fetchData();
                 }, child: const Text("fetch Data"))
             ],
    ), ), ), ); } }
  ```
  
  ```
    Future<void> fetchData() async {  
      // create a dio instance.
      var dio = Dio(); 
    
      // use try , catch method so that if there is an error in link or in status then it goes in error 
      try { 
       Response response = await dio.get('https://jsonplaceholder.typicode.com/posts/1');      
       // Process the response data. 
       print('Response status: ${response.statusCode}.............status code'); 
       print('Response data: ${response.data}.........................data'); 
       if(response.statusCode == 200){     
          var user = response.data;    
       } else {  
          throw Exception('Failed to load users');   
       }
    
      } catch (error) { 
      print('Error: $error'); 
      }}
  ```
      
In above code, it has used get method for reading purpose and in this there is some property through which you can do more work such as:-

* Add queryParameters.

* Use of cancel tokens.

* Options.

* On receive progress

* data.

## Explanation of above property

1. **Options (optional):** The options parameter allows you to provide additional configuration for the request, such as headers, query parameters, authentication tokens, etc.

    ```
    Response response = await dio.get(   'https://api.example.com/data',
       options: Options(  
       headers: {
        'Authorization': 'Bearer YOUR_AUTH_TOKEN'}, 
         queryParameters: {'param1': 'value1'},
       ),
    );
    ```

2. **Data (optional):**  The data parameter can be used for providing request payload or data for certain HTTP methods like POST, PUT, etc. For a GET request, the data parameter is typically not used.

    ```
    Response response = await dio.get(   'https://api.example.com/data',   data: {'key': 'value'}, );
    ```

3. **onReceiveProgress (optional):**  The onReceiveProgress parameter is a callback that allows you to monitor the progress of receiving the response. This can be
    useful for displaying download progress to the user.

    ```
    Response response = await dio.get(   'https://api.example.com/largefile', 
      onReceiveProgress: (int received, int total) {
       print('Received: $received bytes of $total bytes');  
      },
    );
    ```

4. **cancelToken (optional):**  The cancelToken parameter allows you to specify a token that can be used to cancel the request. If you need to cancel a request before it completes, you can use this token.

    ```
    CancelToken cancelToken = CancelToken();
    ```

    ```
    // Later, to cancel the request 
    cancelToken.cancel('Request canceled by user.');
     try {   
      Response response = await dio.get( 
         'https://api.example.com/data',  
          cancelToken: cancelToken,
      );
      } catch (e) { 
        if (CancelToken.isCancel(e)) { 
           print('Request canceled: ${e.message}');
      } }
    ```

5. Note - 
    1. Use `web.PostMan.co` site for checking the api call through this you can successfully check your api call.
    
    2. Use this link `https://reqres.in/` for testing purposes.
    
    3. For image uploading testing use the link `https://imgbb.com/`.

## Post Method
1. Post method is used to create data and send the request to the server.
Here is the code for implementation for the post method in flutter by dio package.


```
Future<void> postData() async { 

  try { 

    Response response = await dio.post( 

      'https://api.example.com/postEndpoint',  

     data: {'key1': 'value1', 'key2': 'value2'},

       options: Options(   

      headers: {'Content-Type': 'application/json'},

 // Optional headers    

   ),  

   );    

  // Process the response data   

  print('Response status: ${response.statusCode}'); 

    print('Response data: ${response.data}'); 

  } catch (error) {  

   print('Error: $error'); 

 }

}

```

In this we use data property to send the data which we want to send.In post method there is 1 extra method from get method which is onSendProgress.
The onSendProgress callback is useful for tasks such as displaying an upload progress bar to the user, allowing them to track the progress of data being sent to the server.

```
Response response = await dio.post( 'https://api.example.com/postEndpoint',
       data: formData,
       options: Options(   
     headers: {'Content-Type': 'multipart/form-data'},
 // Set appropriate content type  
   ),
       onSendProgress: (int sent, int total) {   
      print('Sent: $sent bytes of $total bytes');  
   },    
 );
```


### Here is the proper example for the post method, so you can take it as a reference:-


```
 Future<void> postData() async {  

   // create a dio instance

     var dio = Dio();  

   // use try , catch method so that if there is there is error in link or in status than it goes in error instead of try.  

   try { 

       Response response = await dio.post('https://jsonplaceholder.typicode.com/posts',

 data: {'name': 'bhagirath', 'email': 'bhagi@gmail.com'}, 

        options: Options( 

          headers: {  

           'content-type': 'application/json'    

       },  

       ),  

       onSendProgress: (int sent, int total) {  

         print('Sent: $sent bytes of $total bytes');  

       },     

  );   

     // Process the response data    

   print('Response status: ${response.statusCode}.............status code'); 



      print('Response data: ${response.data}.........................data'); 

      if(response.statusCode == 201){   



      var user = response.data;  

       print(user);    

   }else {     

    throw Exception('Failed to load users');    

   }  

   } catch (error) { 

      print('Error: $error');

     }

   }
```




### For using post and get concurrently:-



You can just call the below function in the button and check the console for status, For Get it shows 200 and for Post it shows 201.


```
 Future<void> getPostData()async{  

 var dio = Dio(); 

  try{  

   String url = 'https://jsonplaceholder.typicode.com/posts'; 

    var response = await Future.wait([  

     dio.get('${url}/1'), 

      dio.post(url),

     ]); 

    print(response[0].statusCode);    

 print(response[1].statusCode);  

 }catch(error){  

   print('Error: $error');

   } }

```

#### WorkFlow of Future.wait:-

1.Waits for multiple futures to complete and collects their results.

2.Returns a future which will complete once all the provided futures have completed, either with their results, or with an error if any of the provided futures fail.



##### PUT Method 

Put method is used to send a request to the specified URL you want to update.


```
Future<void> updateData() async {

  try {

    Response response = await dio.put(

      'https://api.example.com/resource/123',

      data: {'updatedKey': 'updatedValue'},

      options: Options(

        headers: {'Content-Type': 'application/json'}, // Optional headers

      ),

    );



    // Process the response data

    print('Response status: ${response.statusCode}');

    print('Response data: ${response.data}');

  } catch (error) {

    print('Error: $error');

  }

}
```


#### In this example:

We define an asynchronous function updateData to make the PUT request. We use the await keyword to wait for the response from the server.

The put method is called on the Dio instance, and we provide the URL to which the PUT request is sent. The data parameter is used to specify the payload or data you want to send to update the resource.

The Response object contains information about the HTTP response, including the status code, headers, and response data.

Ensure you handle the response and any errors that might occur during the request using try-catch blocks to maintain a robust application.



### Patch Method



The HTTP PATCH method is used to apply partial modifications to a resource. It's typically used to update specific fields or properties of an existing resource on the server without replacing the entire resource. This method is useful when you want to modify certain attributes of a resource without affecting the rest of the data.



##### Example:-

import 'package:dio/dio.dart';


```
void updateUserProfile(String userId, Map<String, dynamic> updatedData) async {

  Dio dio = Dio();

  try {

    Response response = await dio.patch(

      'https://api.example.com/users/$userId',

      data: updatedData,

    );

    print('PATCH request successful. Response: ${response.data}');

  } catch (e) {

    print('Error making PATCH request: $e');

  }

}
```


### Difference between Put and Patch



#### PUT METHOD:

Purpose: The HTTP PUT method is used to update or replace an existing resource or create a new resource if it doesn't already exist at the specified URL.

Idempotent: PUT is considered idempotent, meaning that making the same PUT request multiple times has the same effect as a single PUT request. Subsequent PUT requests with the same data will not cause additional changes.

Resource Update: When using PUT, you typically send the complete representation of the resource you're updating, including all fields, even if you're only updating a single field.



#### PATCH METHOD:

Purpose: The HTTP PATCH method is used to apply partial modifications to an existing resource. It's intended to update specific attributes or properties of a resource without replacing the entire resource.

Not Necessarily Idempotent: PATCH requests are not necessarily idempotent, meaning that making the same PATCH request multiple times may result in different outcomes depending on the server implementation.

Partial Update: When using PATCH, you send only the data that needs to be updated. It's a way to modify specific fields or properties without affecting the rest of the resource.

#### DELETE METHOD:

It is used to send an HTTP DELETE request to a specified URL, typically used to request the removal of a resource on the server.

Ex:-

```

try {

  Response response = await dio.delete('https://api.example.com/resource/$resourceId');

  if (response.statusCode == 200) {

    print('Resource successfully deleted.');

  } else {

    print('Failed to delete resource. Status code: ${response.statusCode}');

  }

} catch (e) {

  print('Error making DELETE request: $e');

}

```

### DOWNLOAD METHOD:

To download a file using Dio, you typically make a GET request and handle the file download manually. Here's a general approach to download a file using Dio:



For this you need to install another additional package of path_provider from pub.dev.


```
 Future<void> downloadData(String urlPath,)async{  

   Dio dio = Dio();  

   final  directory = await getApplicationDocumentsDirectory();   

    var response = dio.download(urlPath, '${directory.path}/filname')

     } 

  }
```


### UPLOAD METHOD:



In dio there is no upload method but we can create a upload method by post method and when you sending your data in data properties by creating a object ,In key-value pair in value you can use:-



await MultipartFile.fromFile(filePath, filename: 'upload.txt'.

You can use the above method to define the send path type format and the format in which you can send to the server.



##### Here is the Example:-



import 'package:dio/dio.dart';


```
class FileUploadService {

  final Dio dio = Dio();



  Future<void> uploadFile(String apiUrl, String filePath) async {

    try {

      final file = await MultipartFile.fromFile(filePath);



      FormData formData = FormData.fromMap({

        'file': file,

        // Add any additional data you want to send with the file

        // 'key': 'value',

      });



      Response response = await dio.post(

        apiUrl,

        data: formData,

        options: Options(

          headers: {

            // Add any required headers here

            'Authorization': 'Bearer YOUR_AUTH_TOKEN',

          },

        ),

      );



      // Handle the response as needed

      print('Response Status: ${response.statusCode}');

      print('Response Data: ${response.data}');

    } catch (e) {

      // Handle any errors

      print('Error uploading file: $e');

    }

  }

}
```

//And function to implement


```
void main() async {

  final fileUploadService = FileUploadService();

  final apiUrl = 'https://example.com/upload'; // Replace with your API endpoint

  final filePath = '/path/to/your/file.png'; // Replace with the actual file path



  await fileUploadService.uploadFile(apiUrl, filePath);

}
```

### Error handling:-

In dio on error handler and its type is deprecated so instead of that you can use exception handler and its type.

We generally use exception handling to handle network error in various types. You can make a common error handler file method in which you can handle the error.


```
class ExceptionHandler { 

   bool dioExceptionHandler(DioException error, dynamic stackTrace) {   

  switch (error.type) {    

   case DioExceptionType.sendTimeout: 

      case DioExceptionType.receiveTimeout:  

     case DioExceptionType.connectionTimeout:     

    Snackbar(context, 'Labels.unableToConnect');   

      return false;

     Break;

       case DioExceptionType.badResponse: 

      case DioExceptionType.cancel: 

        return true; 

        Break;

       case DioExceptionType.unknown:   

      Snackbar(context,'Labels.checkYourConnection');      

   return false;     

    break;  

     default: 

        return true;  

   }

   }

 }
```

To find out more method of DioException method u can go through this github link:-
