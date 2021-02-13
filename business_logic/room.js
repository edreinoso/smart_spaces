const serverless = require('serverless-http');
const bodyParser = require('body-parser');
const express = require('express')
const app = express()
const AWS = require('aws-sdk')

const ROOM_TABLE = process.env.ROOM_TABLE;
const SENSOR_TABLE = process.env.SENSOR_TABLE;
const dynamoDB = new AWS.DynamoDB.DocumentClient();

app.use(bodyParser.json({ strict: false }))

app.get('/getRoomsv1/:floor', function (req, res) { // for now
// app.get('/getRooms, function (req, res) {
  // this is where the code to get rooms will be
  
  console.log('hello world', req.params.floor)

  // would probably get rooms on by flooring
  // there are advantages and disadvantages with this approach
  // advantage would be to have recent data
  // disadvantage would be networking computation
  const params = {
    TableName: ROOM_TABLE,
    FilterExpression: 'floor = :floor',
    ExpressionAttributeValues: { ':floor': req.params.floor }
  }

  var aRooms = []
  var uRooms = []

  dynamoDB.scan(params, (error, result) => {
    if (error) {
      console.log(error)
      res.status(400).json({ error: `Could not get rooms from ${floor} in the ${ROOM_TABLE}`})
    } else {
      console.log(result)

      //creating 
      result.Items.map((item, index) => {
        console.log(item, item.availability)
        if (item.availability) aRooms.push(item)
        else uRooms.push(item)
      })
      console.log('final result:',aRooms, uRooms)
      res.send({ aRooms, uRooms })
    }
  })
})

app.get('/getRoomsv2/:floor', function (req, res) { // for now
  const today = new Date()
  const todayMinus5 = new Date()
  todayMinus5.setMinutes(today.getMinutes() - 5)

  var aRooms = []
  var uRooms = []
  var hello = []
  var response = []

  console.log('hello world', req.params.floor)
  const get_params = {
    TableName: SENSOR_TABLE,
    FilterExpression: 'floor = :floor',
    ExpressionAttributeValues: { ':floor': req.params.floor }
  }

  dynamoDB.scan(get_params, (error, result) => { // scanning
    if (error) {
      console.log(error)
      res.status(400).json({ error: `Could not get data from ${floor} in the ${SENSOR_TABLE}`})
    } else {
      console.log('today minus 5 minutes time: ',todayMinus5)
      result.Items.map((item,index) => {
        let sensorTime = new Date(item.timestamp)
        console.log('iterating through the Item:',item.roomId, item.timestamp, todayMinus5)
        console.log('comparing:', sensorTime > todayMinus5)
        // if(sensorTime > todayMinus5) console.log('room is not available')// room is available
        if(sensorTime > todayMinus5) {// room is available
          // put.item.roomId == availability = true
          console.log('not available')
          var room = {
            "roomId": item.roomId,
            "available": false
          }
          hello.push(room)
        }
        // else console.log('room is available')
        else {
          console.log('available')
          var room = {
            "roomId": item.roomId,
            "available": true
          }
          hello.push(room)
        }
      })
      console.log(hello)
      response = result.Items;
      res.send(result.Items);
    }
  })
  // console.log(hello)
  // res.send('data');
})

app.put('/updateRoom/:id', function(req, res) {
  const put_params = {
    TableName: ROOM_TABLE,
    Key: {
      "id": req.params.id
    },
    UpdateExpression: "set availability=:a",
    ExpressionAttributeValues: {
      ":a": true
    },
    ReturnValues: "UPDATED_NEW"
  }
  console.log(put_params)
  dynamoDB.update(put_params, (err, data) => { // updating
    console.log('test1')
    if (err) {
      console.log('test2')
      console.error("Unable to update item. Error JSON:", JSON.stringify(err, null, 2));
    } else {
      console.log('test3')
      console.log("UpdateItem succeeded:", data);
      res.send(data)
    }
  });
})

app.post('/postRooms', function (req, res) {
  // this is where the code to post rooms will be

  // at this point, the post is only happening request by request
  // it is not handling array variables to be sent
  const { id, name, floor, section, availability } = req.body

  const params = {
    TableName: ROOM_TABLE,
    Item: {
      id: id,
      name: name,
      floor: floor,
      section: section,
      availability: availability
    }
  }

  dynamoDB.put(params, (error) => {
    if (error) {
      console.log(error)
      res.status(400).json({ error: `Could not post data into the ${ROOM_TABLE}` })
    } else {
      res.send({ id, name, floor, section, availability })
    }
  })
})

module.exports.handler = serverless(app);