import React from 'react';
import {  
    Text,
    View,
    FlatList,
    Button,
    TouchableOpacity,
    TouchableHighlight,
    ScrollView, StyleSheet,
} from 'react-native'
import { ExpoLinksView } from '@expo/samples';


data = {}

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Tasks',
  };

  _handleTaskClick = () =>{
    console.log("Key Pressed")
  }

  _onPressButton = () =>{

  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}
     <View >
        <FlatList
          data={[
            {title: 'Title Text',key: 'Task 1'},
            {key: 'Task 2'},
            {key: 'Task 3'},
            {key: 'Task 4'},
            {key: 'Task 5'},
            {key: 'Task 6'},
            {key: 'Task 7'},
          ]}
          renderItem={({item}) => {
              return(
                <View >
                <TouchableHighlight onPress={() => this._handleTaskClick()} style={styles.TaskLink}>
                     <Text style={styles.TaskText}>{item.key}</Text>
                </TouchableHighlight>
                     <Button
                      s
                      onPress={() =>  this._onPressButton}
                      title="Learn More"
                      color="#841584"
                      accessibilityLabel="Learn more about this purple button"
                    />
                  </View>
              )
            }
          }
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
