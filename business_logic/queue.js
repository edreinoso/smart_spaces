// Load the AWS SDK for Node.js
const AWS = require('aws-sdk');

module.exports.handler = async (event) => {
// helloWorld = async (event) => {
    const ddb = new AWS.DynamoDB.DocumentClient({ region: "us-east-1" });
    for (const { messageAttributes } of event.Records) {
        console.log('messageAttributes:', messageAttributes);
        var params = {
            TableName: process.env.PIR_TABLE,
            Item: {
                'id': messageAttributes.id.stringValue,
                'roomName': messageAttributes.roomName.stringValue,
                'roomId': messageAttributes.roomId.stringValue,
                'timestamp': messageAttributes.timestamp.stringValue,
                'ttl': messageAttributes.ttl.stringValue,
                'floor': messageAttributes.floor.stringValue,
            }
        };
        const data = await ddb.put(params).promise()
    }
    // just as FYI for future references and debugging
    return `Successfully processed ${event.Records.length} messages.`;
};

// module.exports.handler = helloWorld()