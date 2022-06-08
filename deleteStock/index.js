const { DynamoDB } = require("@aws-sdk/client-dynamodb");

const REGION = "us-east-1";
const ddb = new DynamoDB({ region: REGION });

exports.handler = async(event) => {
  try {
    // Data passed from the HTTP request is saved as a JSON string in event.body
    // We need to parse it into a Javascript object before we can use it.
    let { ticker } = JSON.parse(event.body);
    const fileItem = {
      Key: {
        ticker: {
          S: ticker
        }
      },
      TableName: "stocks"
    };
    
    return new Promise((resolve, reject) => {
      ddb.deleteItem(fileItem, function(err, data) {
        if (err) {
          console.log(err, err.stack);
          reject(err);
        } else {
          console.log(data);
        }
        const response = {
            statusCode: 200,
            headers: {
              "Access-Control-Allow-Headers": "Content-Type",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            },
            body: JSON.stringify({"error": false})
          };
        resolve(response);
      });
    })
  } catch (err) {
    console.log("Error", err);
    return { statusCode: 500 };
  }
};