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
  FlatList,
  Image,
  Dimensions,
  index,
  TouchableHighlight,
  ScrollView
} from 'react-native';

const numColumns = 3;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource:[],
      pressStatus: false
    };
  };

  renderItem = ({ item }) => {
   return (
      <View>
        <TouchableHighlight>
          <Image style={this.state.pressStatus
                ? styles.nasaImagePress
                : styles.nasaImage}
            source={{uri: item.links[0].href}}/>
        </TouchableHighlight>
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

  fetchData(text) {
    this.setState({ text });
    const url = 'https://images-api.nasa.gov/search?q=';
    const imageType = '&media_type=image';
    fetch(url + text + imageType)
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson.collection.items
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
  };

  render() {
    return (
      <>
        <SafeAreaView>
          <View style={styles.top}>
           <TextInput 
              placeholder="Search for ...(e.g. Orion)" 
              placeholderTextColor={'white'}
              style={styles.searchContainer} 
              onChangeText={(text) => {this.fetchData(text)}}/>
          </View>
          <ScrollView>
            <FlatList 
              data={this.state.dataSource}
              style={styles.imageContainer}
              numColumns={3}
              keyExtractor={this._keyExtractor}
              renderItem= {this.renderItem}
            />
            </ScrollView>
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
    height: '10%',
    fontSize: 18
  },
  imageContainer: {
    alignContent: 'center',
    backgroundColor: '#26282f',
    width: '100%',
    height:'85%'
  },
  nasaImage: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width/numColumns,
    height: Dimensions.get('window').width/numColumns,
    margin: 1,
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    backgroundColor: 'black'
  },
  nasaImagePress: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
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