import React, { Component } from "react";
import { StyleSheet, Text, View, Slider, Button, Alert } from "react-native";
import { API, Auth } from 'aws-amplify';

export default class SliderWidget extends Component {
  constructor(props) {
    super(props);
    this.state = { metric: 5, notification: {} };
    if (props.notification) { 
    	this.state.notification = this.props.notification[0];
    	}
  }
  async componentDidMount() {
  }
  getVal(val) {
    console.warn(val);
  }

  submitSlider (valueSubmit) {
    let surveys = this.state.survey;
    Alert.alert(
        'Are you sure you want to submit?',
        '',
            [
            {text: 'Cancel', onPress: () => console.warn('Cancel Pressed!')},
            {text: 'OK', onPress: () => okPress() }
          ]
    )
    
    function okPress(){
      console.warn('ok');
      console.warn(surveys, valueSubmit)
    }
  }
  

  render() {
  
    var notification_array = this.props.notification.map(notification => {
      if(notification.scheduled_at != null) {
        return ({ 
            id: notification.id,
            scheduled_at: notification.scheduled_at,
            survey: notification.survey,
            user_id: notification.user_id,
             })
      }

    });
    
    notification_array = notification_array.filter(function(n){ return n != undefined }); 

    // console.warn(notification_array);

    // console.warn(notification_array);


    var max_val = Math.max.apply(Math,notification_array.map(function(o){return o.scheduled_at;}));
      // console.warn(max_val);

    var max_obj = notification_array.find(function(o){ return o.scheduled_at == max_val; });

    // console.warn(max_obj);

    // let max_question = this.props.max_obj.map(max_obj => {
    //   if (max_obj.survey){
    //      return <Text style={styles.question} key={max_obj.id}>{max_obj.survey.question}</Text>
    //   }
    
    // });

    let max_notify = this.props.notification.map(notification => {
      return <Text style={styles.question} key={notification.id}>{notification.scheduled_at}</Text>
     
    });

  	
  	let notify = this.props.notification.map(notification => {
  		if (notification.survey){
  			 return <Text style={styles.question} key={notification.id}>{notification.survey.question}</Text>
  		}
     
    });



    // console.warn(max_notify);

    // let time_array = this.props.notification.map(x => x)
    // console.warn(this.props.notification)
    
    return (
        <View>
          {/* {max_notify}
          {notify} */}
          <Text>{max_obj.survey.question}</Text>
          <View style={styles.sliderContainer}>
          <View style={styles.descriptor}>
            <Text>Not at all</Text>
            <Text>Extremely</Text>
          </View>
            <Slider
              style={{ width: '90%' }}
              step={1}
              minimumValue={0}
              maximumValue={10}
              value={this.state.metric}
              onValueChange={val => this.setState({ metric: val })}
              onSlidingComplete={val => this.getVal(val)}
            />
            <Text style={styles.metric}>{this.state.metric}</Text>
          </View>
          <Button
            onPress={() => this.submitSlider(this.state.metric)}
            title="Submit"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  sliderContainer: {
    alignItems: "center",
    backgroundColor: '#20b2aa'
  },
  question: {
    fontSize: 30,
    textAlign: "center",
    color: "#333333",
    margin: 5
  },
  descriptor: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: '90%'
  },
  metric: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  }
});