import React, { Component } from "react";
import { StyleSheet, Text, View, Slider, Button, Alert, ActivityIndicator } from "react-native";
import { API, Auth, Analytics } from 'aws-amplify';
import SliderWidget from './components/SliderWidget';
import { createStackNavigator } from 'react-navigation';

export default class ClassSlider extends Component {

  constructor(props) {
    super(props);
    this.state = {
      notification_array: [],
      metric: 0,
      notification: {},
      survey: [],
      loading: true,
      ind: 1
    }
  }

  forceRemount = () => {
    let ind = this.state.ind++;
    this.setState({index: ind});
  }

  async componentDidMount() {
    this._sub = this.props.navigation.addListener(
      'didFocus',
      async () => {
        
        this.setState({loading: true, survey: [] });
        this.forceRemount();
        let survey = await API.get('surveysCRUD', `/surveys/random`);
        this.setState({ survey, loading: false });
        
      })
  }

  async handleAddSubmission(newSubmission) {
    console.log(newSubmission)
    Analytics.record({
        name: 'surveyTaken', 
        attributes: { 
          survey: newSubmission.survey.question, 
          widget: newSubmission.survey.widget,
          category: newSubmission.survey.category  
        }, 
        metrics: { wellness_value: newSubmission.wellness_value }
    });
    await API.post('wellnessCRUD', '/wellness', { body: newSubmission });
    this.props.navigation.navigate('QuotePage');
  }

  render() {
    const { navigation } = this.props;
    
    const notification = navigation.getParam('notification');
    
    return (

      <View style={ styles.container }>
        <ActivityIndicator size="large" color="#0000ff" animating={ this.state.loading } />
        { this.state.user_sub }
        { notification &&
          <SliderWidget 
            navigation={this.props.navigation} 
            notification={notification} 
            submitSlider={this.handleAddSubmission.bind(this)}
          />

        }
        {!notification && this.state.survey.length > 0 &&
          <SliderWidget 
            navigation={this.props.navigation} 
            survey={this.state.survey[0]} 
            submitSlider={this.handleAddSubmission.bind(this)}
          />
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
