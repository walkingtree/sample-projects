# Dependency Injection with get_it package

## What is dependency injection?

Dependency injection is a software design pattern that deals with the management and injection of dependencies into a class or module from the outside. It is essential to decouple components, making your code more maintainable, testable, and flexible.

In flutter, we can implement the dependency injection using the flutter get_it package.

## What are the advantages of using dependency injection?

* Decoupling: GetIt allows you to decouple your classes from their dependencies, making your codebase more maintainable and flexible.

* Testability: With dependency injection, it becomes easier to mock dependencies during testing, enabling more effective unit testing.* 

* Single Instance Management: GetIt manages the lifecycle of your dependencies, ensuring that singletons are created only once and reused across your application.

* Lazy Initialization: GetIt supports lazy initialization, meaning that dependencies are only created when they are first requested, improving performance and resource management.

* Simplified Code: GetIt simplifies the process of managing dependencies in your Flutter application, leading to cleaner and more readable code.

* Improved Modularization: By breaking your application into smaller, more modular components with clearly defined dependencies, you can enhance code reusability and maintainability.

## How to use the get_it package?

1. Install the get_it package in your application by adding it to the pubspec.yaml- get_it: ^7.6.7 //replace with the latest version.

2. Create a function to initialize the get it service locator-

  ```
  final GetIt getItInstance = GetIt.I OR GetIt.instance; // to initialize the service locator
  ```

  ```
  void init(){
    //register you dependencies below
    
    //bloc 
    //repositories
    //services

    getItInstance.registerLazySingleton<YourClass>(()=> YourClass());
  }
  ```

3. Call the init function inside the void main()-

  ```
  void main(){
  //calling the init
  
  init();
  }
  ```

4. Using the service -

  ```
  getItInstance<YourClass>().getData();
  ```
