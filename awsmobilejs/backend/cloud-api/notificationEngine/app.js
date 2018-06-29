/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

//import { API } from 'aws-amplify';
var express = require('express')
var bodyParser = require('body-parser')
var AWS = require('aws-sdk')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
//var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const cognitoIdentityService = new AWS.CognitoIdentityServiceProvider({region: process.env.REGION});
const params = {
  "UserPoolId": "us-west-2_CV1jywsqB"
};

AWS.config.update({ region: process.env.REGION });
const dynamodb = new AWS.DynamoDB.DocumentClient();

////////////////////////////////////////////////////////////////////
const mhprefix = process.env.MOBILE_HUB_DYNAMIC_PREFIX;
let surveyTableName = "surveys";
let userTableName = "users";
let notifyTableName = "notify";
const notifyPath = "/notify";
const hasDynamicPrefix = true;

var currentDateAndTime = new Date();

if (hasDynamicPrefix) {
  surveyTableName = mhprefix + '-' + surveyTableName;
  notifyTableName = mhprefix + '-' + notifyTableName;
  userTableName = mhprefix + '-' + userTableName;
}
////////////////////////////////////////////////////////////////////


// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

////////////////////////////////////////////////////////////////////


// Get list of surveys from Surveys Endpoint
function getSurveys(callback) {
  let queryParams = {
    TableName: surveyTableName
  } 

  let results = {};

  dynamodb.scan(queryParams, (err, data) => {
    if (err) {
      callback({error: 'Could not load items: ' + err});
    } else {
      callback(results = data.Items);
    }
  });

  //console.log(results);
  
}

function getNotify(callback) {
  let queryParams = {
    TableName: notifyTableName
  }

  let results = {};

  dynamodb.scan(queryParams, (err, data) => {
    if (err) {
      callback({error: 'Could not load notify items: ' + err});
    } else {
      callback(results = data.Items);
    }
  });

}

// Get list of users from Users Endpoint
//function getUsers(callback) {
//  let queryParams = {
//    TableName: userTableName
//  } 
//
//  let results = {};
//
//  dynamodb.scan(queryParams, (err, data) => {
//    if (err) {
//      callback({error: 'Could not load items: ' + err});
//    } else {
//      callback(results = data.Items);
//    }
//  });
//
//  console.log(results);
//}

// Writes the new notification objects to Notify Endpoint 
//function writesToNotifyEndPoint(newNotification) {
//API.post('notifyCRUD', '/notify', { body: newNotification });
//}

///////////////////////////////////////////////////////////////////

/**********************
 * Example get method *
 **********************/

app.get('/notificationEngine', function(req, res) {

  let surveyResults = getSurveys(function(rs){
    console.log('suh survey',rs);
    res.json({rs});
  });

  let notifyResults = getNotify(function(rn){
    console.log('suh notify',rn)
    res.json({rn});
  });
  // let userResults = getUsers(function(ru){
 //   console.log('suh user', ru);
 //   res.json({ru});
 // });

  // let userId = users.id;
  //
  // let userLength = users.length;
  // for (var i = 0; i < usersLength; i++) {
  //  console.log(users);
  // }
  //
  //const newNotification = {"id": notificationId.toString(), "surveyId": surveyId.toString(), "scheduled_at": parseInt(scheduled_at)}; 
  // writesToNotifyEndPoint(newNotification);
  //  
  // Return the API Gateway event and query string parameters for example
  //res.json(req.apiGateway.event);
  // Return the API Gateway event and query string parameters for example
  //res.json({success: 'got the surveys', url: req.url, body: req.body});
});
app.get('/notificationEngine/users', function(req, res) {

  let queryParams = {
    TableName: userTableName
  } 

  dynamodb.scan(queryParams, (err, data) => {
    if (err) {
      res.json({error: 'Could not load items: ' + err});
    } else {
      res.json(data.Items);
    }
  });
});
//app.get('/notificationEngine/*', function(req, res) {
// Add your code here
//  res.json({success: 'get call succeed!', url: req.url});
//});

/****************************
 * Example post method *
 ****************************/

app.post('/notificationEngine', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

app.post('/notificationEngine/*', function(req, res) {
  // Add your code here
  res.json({success: 'post call succeed!', url: req.url, body: req.body})
});

/****************************
 * Example post method *
 ****************************/

app.put('/notificationEngine', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

app.put('/notificationEngine/*', function(req, res) {
  // Add your code here
  res.json({success: 'put call succeed!', url: req.url, body: req.body})
});

/****************************
 * Example delete method *
 ****************************/

app.delete('/notificationEngine', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.delete('/notificationEngine/*', function(req, res) {
  // Add your code here
  res.json({success: 'delete call succeed!', url: req.url});
});

app.listen(3000, function() {
  console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
