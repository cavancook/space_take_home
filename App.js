/**
 * This is an attempted recreation of the nasa image website
 * https://images.nasa.gov/ on react native using their own api
 * 
 * @author Cavan Cook
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
  Dimensions,
  index,
} from 'react-native';

const numColumns = 3;

export default class App extends React.Component {
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
          source={{uri: item.links[0].href}}/>
          {/* <Text>{item.href}</Text> */}
      </View>
    )
  }

  _keyExtractor = (item, index) => index;

  componentDidMount(){
    fetch("https://images-api.nasa.gov/search?q=stars&media_type=image")
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
         dataSource: responseJson.collection.items
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
          {/* <View style={styles.imageContainer}> */}
            <FlatList 
              data={this.state.dataSource}
              style={styles.imageContainer}
              numColumns={3}
              keyExtractor={this._keyExtractor}
              renderItem= {this.renderItem}
            />
            {/* </View> */}
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
    alignContent: 'center',
    backgroundColor: '#26282f',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    width: '100%',
    height:'85%'
  },
  nasaImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width/3,
    height: Dimensions.get('window').width/3,
    margin: 1,
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'black'
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
    fontSize: 15
  }
});