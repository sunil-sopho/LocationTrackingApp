import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser,Constants, MapView, Location, Permissions } from 'expo';

import { MonoText } from '../components/StyledText';
// import allTasks from '../constants/allTasks';
var tasks = require('../constants/allTasks')
tasks = tasks.tasks;


export default class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  // state variable 
  state = {
    mapRegion: null,
    hasLocationPermissions: false,
    locationResult: null,
    location:{coords: { latitude: 37.78825, longitude: -122.4324}},
    mytasks: tasks,
    random_shit : "nothing",
    printer: []
  };



  componentDidMount() {
    // this._getT()
    this._getLocationAsync();
    // setTimeout(_sendLocation, 5000);

    // this._getT()

  }

  _sendLocation = async () => {
    fetch("URL", {
       method: "POST",
       headers: headers,
       body:  JSON.stringify(this.state.location.coords),
    })
  }

  _handleMapRegionChange = mapRegion => {
    console.log(mapRegion);
    // this._getT()
  
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
     });
   } else {
     this.setState({ hasLocationPermissions: true });
   }

   let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true });
   this.setState({ locationResult: JSON.stringify(location),location });
   
    // Center the map on the location we just fetched.
    this.setState({mapRegion: { latitude: location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
  };

  _handleReset = () => {
    // let location = await Location.getCurrentPositionAsync({});

    // Center the map on the location we just fetched.
    this.setState({mapRegion: { latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }});
  };



  // _updateState = async() => {
  //   // while(true) {
  //     // this._handleReset();
  //     // this.setState({mytasks : tasks.tasks})
  //       this.setState({random_shit : "again_nothing"})    // }
  // }

  // _getTasks(){
  //   let temptask = this.props.navigation.getParam(Task, null);
  //   if(temptask !== null) {tasks: this.state.tasks.concat([temptask])}
  //   console.log("Inside getTasks");
  // };
  
  // _getT(){
  //   for(var i=0;i<2;i++){
  //     console.log(tasks[i])
  //       {printer: this.state.printer.concat([<Text> {tasks[i]} </Text>])}
  //   }
  //   tasks[0]=5;
    
  // }

  _update_states = async () => {
    console.log(this.state.mytasks.newtasks[0])
    if(tasks.newtasks[0] === 1){
      tasks.newtasks[0] = 0;
      this.setState({random_shit: "Again nothing", mapRegion : this.state.mapRegion})
    }
  }

  render() {
    var intervalID = setInterval(this._update_states, 1000);
    // setTimeout(this._update_states, 1000)

    let markers = this.state.mytasks.tasks || [];
  
    return (

      <View style={styles.container}>
          {/*
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require('../assets/images/robot-dev.png')
                  : require('../assets/images/robot-prod.png')
              }
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            {this._maybeRenderDevelopmentModeWarning()}

            <Text style={styles.getStartedText}>Get started by opening</Text>

            <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
              <MonoText style={styles.codeHighlightText}>screens/HomeScreen.js</MonoText>
            </View>

            <Text style={styles.getStartedText}>
              Change this text and your app will automatically reload.
            </Text>
          </View>

          <View style={styles.helpContainer}>
            <TouchableOpacity onPress={this._handleHelpPress} style={styles.helpLink}>
              <Text style={styles.helpLinkText}>Help, it didn’t automatically reload!</Text>
            </TouchableOpacity>
          </View> 
        </ScrollView>

        */}


        {
          this.state.locationResult === null ?
          <Text>Finding your current location...</Text> :
          this.state.hasLocationPermissions === false ?
            <Text>Location permissions are not granted.</Text> :
            this.state.mapRegion === null ?
            <Text>Map region doesn't exist.</Text> :
            <MapView 
                style={{ alignSelf: 'stretch', height: 400 }}
              showsUserLocation={true}
              followUserLocation={true}
              region={ this.state.mapRegion }
              onRegionChangeComplete={this._handleMapRegionChange}
              >
                {/*<MapView.Marker
                  coordinate={this.state.location.coords}
                  title="My Marker"
                  description="Some description"
                />*/}
                {markers.map(marker => (
                  <MapView.Marker key={marker.id}
                    coordinate={marker.coordinates}
                    title={marker.title}
                    description={marker.description}
                  />
                ))}
            </MapView>
        }
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this._handleReset} style={[styles.bubble, styles.button]}>
            <Text style={styles.bottomBarContent}>
              Reset Location
            </Text>
          </TouchableOpacity>

        </View>
        
        <View style={styles.tabBarInfoContainer}>
          <Text style={styles.tabBarInfoText}>Location: {this.state.locationResult}</Text>

         {/* <View style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>navigation/MainTabNavigator.js</MonoText>
          </View> */}
        </View>
      </View>
    );
  }

// Old helping code for future

//   _maybeRenderDevelopmentModeWarning() {
//     if (__DEV__) {
//       const learnMoreButton = (
//         <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
//           Learn more
//         </Text>
//       );

//       return (
//         <Text style={styles.developmentModeText}>
//           Development mode is enabled, your app will be slower but you can use useful development
//           tools. {learnMoreButton}
//         </Text>
//       );
//     } else {
//       return (
//         <Text style={styles.developmentModeText}>
//           You are not in development mode, your app will run at full speed.
//         </Text>
//       );
//     }
//   }

//   _handleLearnMorePress = () => {
//     WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/guides/development-mode');
//   };

//   _handleHelpPress = () => {
//     WebBrowser.openBrowserAsync(
//       'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
//     );
//   };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
