/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const uuidv4 = require('uuid/v4');
//import { API } from 'aws-amplify';
var express = require('express')
var bodyParser = require('body-parser')
var AWS = require('aws-sdk')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
var JulianDate = require('julian-date')
let j = new JulianDate(); // Get the julian date
let jd = j.julian(); // Get the julian days. Example: 5543.5
let jdfloor = Math.floor(jd);

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
}

//Get list of users from Users Endpoint
function getUsers(callback) {
  let queryParams = {
    TableName: userTableName
  } 

  let results = {};

  dynamodb.scan(queryParams, (err, data) => {
    if (err) {
      callback({error: 'Could not load items: ' + err});
    } else {
      callback(results = data.Items);
    }
  });
}

// the hashifier of a string
String.prototype.hashCode = function() {
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};

function notification_Engine(){
  let userResults;
  return new Promise(resolve => {
    
    getUsers(function(ru){
      console.log('users', ru);
      userResults = ru;
  
      let surveyResults; 
      getSurveys(function(rs){
        console.log('surveys',rs);
        surveyResults = rs;
  
        let scheduled_at = jd;
        //let scheduled_at = 1530565200;
        let user_id = ru.map(a => ({user_id: a.identityid})); 
        console.log('user_id: ', user_id);
        let widget = surveyResults.map(a => a.widget);
        console.log('widget: ', widget);
        let survey_id = surveyResults.map(a => a.id);
        console.log('survey_id ', survey_id);
        let category = surveyResults.map(a => a.category);
        console.log('category ', category);
        let question = surveyResults.map(a => a.question);
        console.log('question ', question);
  
        let modular = 3; // total number of surveys
  
        let arrayOfNotificationObjects = [];
        // Iterate through all users and add new field groupIndex to each user
        // based on the mod of their hash value 
        for (let i = 0; i < user_id.length; i++) {
          let preHashUserId = user_id[i].user_id;
          let hashUserId = preHashUserId.hashCode();
          console.log('hashUserId:', hashUserId)
          if (hashUserId % modular == 0) {
            user_id[i].groupIndex = 0;
          } else { 
            user_id[i].groupIndex = 1;
          }
        }
        // Modular the Julian date and create newNotification
        for (let i = 0; i < user_id.length; i++) {
          let julianDateHashConditional = ((i + (jdfloor % modular)) % modular) 
          if ( julianDateHashConditional == 0 && user_id[i].groupIndex == 0) {
            console.log(julianDateHashConditional, user_id[i].groupIndex);
            createNewNotification(user_id[i].user_id, surveyResults[0]);
          } else {
            createNewNotification(user_id[i].user_id, surveyResults[1]);
            console.log(julianDateHashConditional, user_id[i].groupIndex);
          }
        }
        for (let i = 0; i < user_id.length; i++) {
          let julianDateHashConditional = ((i + (jdfloor % modular)) % modular) 
          createNewNotification(user_id[i].user_id, surveyResults[0]);
        } 
        // Testing for loop to mod julian date and create newNotification
  
  
        function createNewNotification(userIdOfExpectedGroupIndex, surveyObject){
          let newNotification = 
            { 
              'scheduled_at': scheduled_at,
              'survey':
              { 
                'widget': surveyObject.widget,
                'survey_id': surveyObject.id,
                'category': surveyObject.category,
                'question': surveyObject.question
              },
              'user_id': userIdOfExpectedGroupIndex.toString(),
              'id': uuidv4().toString() 
            }
          arrayOfNotificationObjects.push(newNotification);
        };
  
        console.log("Array of Notification Objects", arrayOfNotificationObjects);
        let requestItems = arrayOfNotificationObjects.map(n => {
          return {
            PutRequest: {
              Item: n
            }
          }
        });
   
        let params = {
          RequestItems: {}
        }
   
        params.RequestItems[notifyTableName] = requestItems;
        dynamodb.batchWrite(params, (err, data) => {
        console.log(err,data);
        if(err) {
          resolve('resolved');
          return {error: err};
        } else {
          resolve('resolved');
          return {success: 'post call succeed!'};
        }
        });
  
      }); // end surveyResults 
    }); // end of userResults
  });
  
}

///////////////////////////////////////////////////////////////////

/**********************
 * Example get method *
 **********************/

app.get('/notificationEngine', function(req, res) {

 
  
  // async function makeTheResponse(){
  //   let response = await notification_Engine();
  //   return response;
  // }
  // makeTheResponse().then(function(){
    
  // })
  setTimeout(function(){
    res.json("you done here----------------");
  },2000)
  
 
  // notification_Engine();
  // res.json("---------------You are done testing here---------------")
  // res.json(response);
}); // end of app.get
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
  async function makeTheResponse(){
    let response = await notification_Engine();
    return response;
  }
  makeTheResponse().then(function(){
    console.log('finished')
  })
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app