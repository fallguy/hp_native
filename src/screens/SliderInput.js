import React, { Component } from "react";
import { StyleSheet, Text, View, Slider, Button, Alert } from "react-native";
import { API, Auth } from 'aws-amplify';
import SliderWidget from '../SliderWidget';


export default class ClassSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notification: [],
      user_sub: ""
    };
    
  }
  async componentDidMount() {
    let notification = await API.get('notifyCRUD', `/notify/`);
    let user_sub = "";
      Auth.currentSession().then((e) => {
        // return e.idToken.payload
        // console.log(e.idToken.payload.sub) //Display user ID
        user_sub = e.idToken.payload.sub  //Display user ID
        this.setState({ user_sub });
      });
    // let notification = await API.get('notifyCRUD', `/notify/user_id/{id}`);
    //console.warn(notification);
    this.setState({ notification, user_sub });
    // console.warn(session);

  }

  render() {
    return (
      <View style={styles.container}>
       {this.state.user_sub}
       {this.state.notification.length > 0 &&
        <SliderWidget notification={this.state.notification}/>
      }
       
       
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#F5FCFF",
  }
});
