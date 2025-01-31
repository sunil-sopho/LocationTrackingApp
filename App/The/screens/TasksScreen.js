import React from 'react';
import {  
    Text,
    View,
    FlatList,
    Button,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView, StyleSheet,
    ActivityIndicator,
} from 'react-native'
import { ExpoLinksView } from '@expo/samples';
var tasks = require('../constants/allTasks')
tasks = tasks.tasks;
data = {}

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Tasks',
  };

  state = {
    isLoading : true,
    mytasks: tasks
  };

  _handleTaskClick = (itemId) =>{
    console.log("Task Pressed")
    // Map._setLocationToTask();
    tasks.goToTasks[0] = itemId;
    console.log(tasks.goToTasks[0])
    this.props.navigation.navigate("Map", {taskId: itemId} )
    // tasks.newtasks[0] = 1;
  }

  _handleInfoClick = () =>{
    console.log("Info Pressed");
  }

    // update task in tasks
    // // tasks[0] = 10;
    // tasks.tasks.push({
    //   id: 2,
    //   title: 'hello2',
    //   coordinates: {
    //     latitude: 3.148561,
    //     longitude: 101.652778
    //   },
    //   description: "This is task2"
    // })

  componentDidMount(){
    this.state.mytasks.tasks.push({
      id: 2,
      title: 'hello2',
      coordinates: {
        latitude : 28.54589629156801, 
        longitude : 77.190514796065
      },
      description: "This is task2"
    })
    tasks.newtasks[0] = 1;
    var tid = setInterval(() => this._getTasks(), 1000)

  }

  _getTasks = async () => {
    fetch("https://facebook.github.io/react-native/movies.json")
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  // state1 = {
  //   tasks : [{
  //     id: 0,
  //     title: 'hello',
  //     coordinates: {
  //       latitude : 28.57489629156801, 
  //       longitude : 77.161514796065
  //     },  
  //     description: "This is task 1"
  //   }]  
  // };

  render() {

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }


  return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
     <View >
        <FlatList
          data = {tasks.tasks}
          renderItem={({item}) => {
              return(
                <View >
                <TouchableHighlight onPress={() => this._handleTaskClick(item.id)} style={styles.TaskLink}>
                     <Text style={styles.TaskText}>{item.title}</Text>
                </TouchableHighlight>
                     <Button
                      s
                      onPress={() =>  this._handleInfoClick()}
                      title={item.description}
                      color="#841584"
                      accessibilityLabel="Learn more about this purple button"
                    />
                  </View>
              )
            }
          }
          keyExtractor={item => item.id.toString()}
        />
      </View>
      </ScrollView>
    );
  }
  
}


// //Tasks Component
// const Tasks = (props) => {
//      const { navigate } = props.navigation;
//      //function to go to next screen
//      goToNextScreen = () => {
//          return navigate('Detail');
//      }
//      return (
//       <View>
//         <FlatList
//           data={[
//             {key: 'Task 1'},
//             {key: 'Task 2'},
//             {key: 'Task 3'},
//             {key: 'Task 4'},
//             {key: 'Task 5'},
//           ]}
//           renderItem={({item}) => {
//               return(
//                 <TouchableHighlight onPress={() => this.goToNextScreen()}>
//                      <Text >{item.key}</Text>
//                 </TouchableHighlight>
//               )
//             }
//           }
//         />
//       </View>
//     );
// }

// //example for detail screen
// const Detail = (props) => {
//     const { navigate } = props.navigation;
//     return(
//         <View><Text>Detail Screen</Text></View>
//     );
// }

// //initial screen
// const App = StackNavigator({
//   Tasks: {screen: Tasks},
//   Detail: {screen: Detail},
// })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingBottom: 25,

    // marginBottom:20
  },helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  TaskLink: {
    paddingVertical: 15,
  },
  Task1Text: {
    fontSize: 14,
    color: '#2e78b7',
  }, 
  TaskText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },ButtonStyles:{
    // marginBottom:10
  }
});
