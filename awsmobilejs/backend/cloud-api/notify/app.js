/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require('express')
const bodyParser = require('body-parser')
const AWS = require('aws-sdk')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');

AWS.config.update({ region: process.env.REGION });
const dynamodb = new AWS.DynamoDB.DocumentClient();

const mhprefix  = process.env.MOBILE_HUB_DYNAMIC_PREFIX;
let tableName = "notify";
const hasDynamicPrefix = true;

const userIdPresent = false;
const partitionKeyName = "id";
const partitionKeyType = "S"
const sortKeyName = "";
const sortKeyType = "";
const hasSortKey = false;
const path = "/notify";

const awsmobile = {}

if (hasDynamicPrefix) {
  tableName = mhprefix + '-' + tableName;
} 

const UNAUTH = 'UNAUTH';

//Global Vars for UserId/SurveyId
let userIds = ['1'];
let surveyIds = ['1'];

// declare a new express app
var app = express()
app.use(awsServerlessExpressMiddleware.eventContext({ deleteHeaders: false }), bodyParser.json(), function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch(type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
}

/********************************
 * HTTP Get method for list objects *
 ********************************/
app.get('/notify', function (req, res) {

  let queryParams = {
    TableName: tableName
  }

  dynamodb.scan(queryParams, (err, data) => {
    if (err) {
      res.json({
        error: 'Could not load items: ' + err
      });
    } else {
      res.json(data.Items);
    }
  });
});

app.get('/notify/user', function (req, res) {
  var userid = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  dynamodb.query({
    TableName: tableName,
    IndexName: 'users',
    KeyConditions: {
      user_id: {
        ComparisonOperator: 'EQ',
        AttributeValueList: [userid],
      },
    },
  }, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        message: 'Could not load data',
      }).end();
    } else {
      if(!(data.Items instanceof Array)){
        console.log('malformed response from AWS, no Items in: ' + JSON.stringify(data));
        res.status(500).json({
          message: 'Could not load data',
        }).end();
      }
      var dropcount = 0;
      var sendMe = [];
      for(i = 0; i < data.Items.length; i++) {
        var item = data.Items[i];
        if(!('sent_at' in item)){
          sendMe.push(item);
          updateSent(item.id);
        } else {
          dropcount++;
        }
      }
      console.log('number of items dropped: ' + dropcount);
      res.json(sendMe).end();
    }
  });

});


function updateSent(notify_id) {
  var params = {
    TableName: tableName,
    Key: {"id": notify_id},
    ExpressionAttributeNames: {'#changeme': 'sent_at'},
    ExpressionAttributeValues: {":now" : Date.now()},
    UpdateExpression: "set #changeme = :now",
    ReturnValues: "UPDATED_NEW"
  };
  dynamodb.update(params, function(err, data) {
    if(err) {
      console.log(err, err.stack)
    } else {
      return true;
    }
  });
}


app.get('/notify/:id', function(req, res) {
  var condition = {}
  condition[partitionKeyName] = {
    ComparisonOperator: 'EQ'
  }
  
  if (userIdPresent && req.apiGateway) {
    condition[partitionKeyName]['AttributeValueList'] = [req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH ];
  } else {
    try {
      condition[partitionKeyName]['AttributeValueList'] = [ convertUrlType(req.params[partitionKeyName], partitionKeyType) ];
    } catch(err) {
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let queryParams = {
    TableName: tableName,
    KeyConditions: condition
  } 

  dynamodb.query(queryParams, (err, data) => {
    if (err) {
      res.json({error: 'Could not load items: ' + err});
    } else {
      res.json(data.Items);
    }
  });
});

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

app.get('/notify/object/:id/:time', function(req, res) {
  var params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
    try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
    } catch(err) {
      res.json({error: 'Wrong column type ' + err});
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
    } catch(err) {
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let getItemParams = {
    TableName: tableName,
    Key: params
  }

  dynamodb.get(getItemParams,(err, data) => {
    if(err) {
      res.json({error: 'Could not load items: ' + err.message});
    } else {
      if (data.Item) {
        res.json(data.Item);
      } else {
        res.json(data) ;
      }
    }
  });
});

/************************************
* HTTP put method for list all objects *
*************************************/

app.get('/notify', function(req, res) {
 
  let queryParams = {
    TableName: tableName
  } 

  dynamodb.scan(queryParams, (err, data) => {
    if (err) {
      res.json({error: 'Could not load items: ' + err});
    } else {
      res.json(data.Items);
    }
  });
});

app.get('/notify/userIds', function(req, res) {
  res.json({data: userIds})
});
app.get('/notify/surveyIds', function(req, res) {
  res.json({data: surveyIds})
});
/************************************
* HTTP put method for insert object *
*************************************/

app.put(path, function(req, res) {
  
  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  if (!req.body.userId) {
    res.json({error: 'invalid userId', url: req.url, body: req.body});
  }

  if (!req.body.surveyId) {
    res.json({error: 'invalid surveyId', url: req.url, body: req.body});
  }

  let putItemParams = {
    TableName: tableName,
    Item: req.body
  }
  dynamodb.put(putItemParams, (err, data) => {
    if(err) {
      res.json({error: err, url: req.url, body: req.body});
    } else{
      res.json({success: 'put call succeed!', url: req.url, data: data})
    }
  });
});

/************************************
* HTTP post method for insert object *
*************************************/

app.post(path, function(req, res) {
  
  if (userIdPresent) {
    req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  let putItemParams = {
    TableName: tableName,
    Item: req.body
  }
  dynamodb.put(putItemParams, (err, data) => {
    if(err) {
      res.json({error: err, url: req.url, body: req.body});
    } else{
      res.json({success: 'post call succeed!', url: req.url, data: data})
    }
  });
});

/**************************************
* HTTP remove method to delete object *
***************************************/

app.delete('/notify/object/:id/:time', function(req, res) {
  var params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
     try {
      params[partitionKeyName] = convertUrlType(req.params[partitionKeyName], partitionKeyType);
    } catch(err) {
      res.json({error: 'Wrong column type ' + err});
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(req.params[sortKeyName], sortKeyType);
    } catch(err) {
      res.json({error: 'Wrong column type ' + err});
    }
  }

  let removeItemParams = {
    TableName: tableName,
    Key: params
  }
  dynamodb.delete(removeItemParams, (err, data)=> {
    if(err) {
      res.json({error: err, url: req.url});
    } else {
      res.json({url: req.url, data: data});
    }
  });
});

app.listen(3000, function() {
    console.log("App started")
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
