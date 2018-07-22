import { MapView, Marker } from 'expo';
import React, { Component } from 'react';
import { StyleSheet,  Text, TextInput, View, Button, Dimensions, Platform, ScrollView } from 'react-native';
import { API, Auth } from 'aws-amplify';
import aws_exports from '../aws-exports';

export default class Map extends Component {


    constructor(props) {
        super(props);
        this.state = {
          wellness: []
    
        }
      }
    
      async componentDidMount() {
        let wellnessResult = await API.get('wellnessCRUD', `/wellness`);
        let wellness = wellnessResult.map(wellness => {
           if(wellness.location){
            return pick(wellness.location.coords, ['latitude', 'longitude'])
           }
          });
        function pick(obj, keys) {
            return Object.assign({}, ...keys.map(k => k in obj ? {[k]: obj[k]} : {}))
        }
        this.setState({ wellness });
      }
  render() {
    let wellessItems;
    if (this.state.wellness) {
      //console.warn(this.state.wellness)
    wellessItems = this.state.wellness.map((wellness,index) => {
      if(wellness){
        return (
          
          <MapView.Marker coordinate={wellness} key={index}  />
      )
      }
      
    });
  }
    return (
        <ScrollView style={{backgroundColor: 'white', flex: 1}}>
        <View>
    <Text style={styles.header}>Map</Text>
    <Text style={styles.subheader}>Check out your map data below.</Text>
    </View>
      <View style={{flex: 1}}>
        <MapView
        style={styles.container}
        initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 60,
            longitudeDelta: 60,
          }}
        provider='google'
      >
       {wellessItems}
       {/* <MapView.Heatmap points={this.state.wellness}
      opacity={1} radius={20} maxIntensity={100} gradientSmoothing={10} heatmapMode={"POINTS_DENSITY"}/>    
       */}
        </MapView>
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 200,
      },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  header: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 20
  },
  subheader: {
    fontSize: 20,
    textAlign: 'center'
  },
});
