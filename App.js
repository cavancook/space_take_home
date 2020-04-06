/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  // StatusBar,
  Button,
  FlatList,
  Image,
} from 'react-native';

// import { Colors, ReloadInstructions } from 'react-native/Libraries/NewAppScreen';



export default class App extends React.Component {

  // const [name, setName] = useState([
  //   {name: 'cavan', key: '1'}, 
  //   {name: 'zoe', key: '2'}, 
  //   {name: 'conor', key: '3'},
  //   {name: 'kyle', key: '4'}, 
  //   {name: 'kelly', key: '5'}, 
  //   {name: 'james', key: '6'},
  //   {name: 'jess', key: '7'}, 
  //   {name: 'kevin', key: '8'}, 
  //   {name: 'jimmy', key: '9'}
  // ]);
  //   const [image, setImage] = useState([
  //     {image: 'uri: \'https://images-assets.nasa.gov/image/as11-42-6179/as11-42-6179~thumb.jpg\'', key: '1'}, 
  //     {image: 'uri: \'https://images-assets.nasa.gov/image/as11-42-6179/as11-42-6179~thumb.jpg\'', key: '2'}, 
  //     // {image: 'conor', key: '3'},
  //     // {image: 'kyle', key: '4'}, 
  //     // {image: 'kelly', key: '5'}, 
  //     // {image: 'james', key: '6'},
  //     // {image: 'jess', key: '7'}, 
  //     // {image: 'kevin', key: '8'}, 
  //     // {image: 'jimmy', key: '9'},
  //   ]);

    // const numColumns = 3;

    constructor(props) {
      super(props);
      this.state = {
        dataSource:[]
       };
    };

    renderItem = ({ item }) => {
      return (
      <View>
        <Image style={styles.nasaImage}
        source={{uri: item.download_url}}/>
        {/* <Text>{item.author}</Text> */}
      </View>
      )
    }

     componentDidMount(){
      fetch("https://picsum.photos/v2/list")
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
         dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
    };
  render() {
  return (
    <>
      {/* <StatusBar barStyle="dark-content" /> */}
      <SafeAreaView>
        <View style={styles.top}>
          <TextInput 
            placeholder="Search for ...(e.g. Orion)" 
            placeholderTextColor={'white'}
            style={styles.searchContainer}/>

        </View>
        <View style={styles.imageContainer}>

            <FlatList 
            data={this.state.dataSource}
            style={styles.imageContainer}
            numColumns={3}
            renderItem= {this.renderItem}
            />
        </View>
        
      </SafeAreaView>
  </>
  );
            }    
};

const styles = StyleSheet.create({
  
  top: {
    alignItems: 'center',
    backgroundColor: '#26282f',
    width: '100%',
    height: '15%',
    fontSize: 18
  },
  imageContainer: {
    backgroundColor: '#26282f',
    flexDirection: 'row',
    // flexWrap: 'wrap',
    width: '100%',
    height:'85%',
  },
  nasaImage: {
    width: '33.333%',
    height: '33.333%',
    margin: 15,
    padding: 20,
    borderColor: 'black',
    borderWidth: 2,
    backgroundColor: 'orange',
  },
  searchContainer: {
    alignContent: 'center',
    width: '80%',
    height: '12%',
    padding: 15,
    borderWidth: 3,
    borderColor: '#15418c',
    marginTop: '5%',
    marginBottom: '5%',
    color: 'white',
    fontSize: 15,
  },
  styleTester: {
    flexDirection: 'row',
    width: '33.333%',
    height: '10%',
    // flexwrap: 'wrap',
    borderWidth: 3,
    borderColor: 'black',
    backgroundColor: 'gray',
  }
});

// export default App;
