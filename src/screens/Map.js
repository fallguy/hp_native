import { MapView, Marker } from 'expo';
import React, { Component } from 'react';
import { StyleSheet,  Text, TextInput, View, Button, Dimensions, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { API, Auth } from 'aws-amplify';
import aws_exports from '../aws-exports';
import { NavigationEvents } from 'react-navigation';
export default class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
          wellness: [],
          loading: true
    
        }
      }
      
      async componentDidMount() {
        this._sub = this.props.navigation.addListener(
          'didFocus',
          async () => {
            console.log('mounted')
            this.setState({loading: true, wellness: [] });
            
            let wellnessResult = await API.get('wellnessCRUD', `/wellness/user`);
            console.log(wellnessResult)
            let wellness = wellnessResult.map(wellness => {
              if(wellness.location){
                let result = pick(wellness.location.coords, ['latitude', 'longitude']);
                result.wellness_value = wellness.wellness_value;
                //  console.warn(result)
                return result;
              }
              });
            function pick(obj, keys) {
                return Object.assign({}, ...keys.map(k => k in obj ? {[k]: obj[k]} : {}))
            }
            this.setState({ wellness, loading: false });
          }
        );
        
       
      }
      componentWillUnmount() {
        console.log('remove')
        this._sub.remove();
       
      }
  render() {
    let wellessItems;
    if (this.state.wellness) {
      //console.warn(this.state.wellness)
    wellessItems = this.state.wellness.map((wellness,index) => {
      if(wellness){
        let bgcolor = "red";
          switch(true) {
            case (wellness.wellness_value < 4):
           
                bgcolor = "red"
                break;
            case (wellness.wellness_value < 8):
        
                bgcolor = "blue"
                break;
            case (wellness.wellness_value < 11):
            
                bgcolor = "green"
                break;
            default: 
     
                break;
        }
      
        return (
          <MapView.Marker coordinate={wellness} key={index} pinColor={bgcolor}   />
        )
      }
      
    });
  }
    return (
        <View style={{backgroundColor: 'white', height: '100%'}}>
       
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
      
       
        </MapView>
        { this.state.loading ? <ActivityIndicator style={styles.loading} size="large" color="#0000ff" animating={this.state.loading} />: null }
        
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
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
  loading: {
    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'
  }
});
