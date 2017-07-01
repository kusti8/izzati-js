
# react-native-izzati

## Getting started

`$ npm install react-native-izzati --save`

### Mostly automatic installation

`$ react-native link react-native-izzati`

### Manual installation


#### iOS

1. In XCode, in the project navigator, right click `Libraries` ➜ `Add Files to [your project's name]`
2. Go to `node_modules` ➜ `react-native-izzati` and add `RNIzzati.xcodeproj`
3. In XCode, in the project navigator, select your project. Add `libRNIzzati.a` to your project's `Build Phases` ➜ `Link Binary With Libraries`
4. Run your project (`Cmd+R`)<

#### Android

1. Open up `android/app/src/main/java/[...]/MainActivity.java`
  - Add `import com.reactlibrary.RNIzzatiPackage;` to the imports at the top of the file
  - Add `new RNIzzatiPackage()` to the list returned by the `getPackages()` method
2. Append the following lines to `android/settings.gradle`:
  	```
  	include ':react-native-izzati'
  	project(':react-native-izzati').projectDir = new File(rootProject.projectDir, 	'../node_modules/react-native-izzati/android')
  	```
3. Insert the following lines inside the dependencies block in `android/app/build.gradle`:
  	```
      compile project(':react-native-izzati')
  	```

#### Windows
[Read it! :D](https://github.com/ReactWindows/react-native)

1. In Visual Studio add the `RNIzzati.sln` in `node_modules/react-native-izzati/windows/RNIzzati.sln` folder to their solution, reference from their app.
2. Open up your `MainPage.cs` app
  - Add `using Com.Reactlibrary.RNIzzati;` to the usings at the top of the file
  - Add `new RNIzzatiPackage()` to the `List<IReactPackage>` returned by the `Packages` method


## Usage
```javascript
import RNIzzati from 'react-native-izzati';

// TODO: What to do with the module?
RNIzzati;
```
  