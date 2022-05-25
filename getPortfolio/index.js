
const { DynamoDB } = require("@aws-sdk/client-dynamodb");

// Set the AWS Region.
const REGION = "us-east-1";
// Create an Amazon DynamoDB service client object.
const ddb = new DynamoDB({ region: REGION });

const params = {
  TableName: "stocks"
}

exports.handler = async(event) => {
  try {
    const data = await ddb.scan(params);
    data.Items.forEach(function(element, index, array) {
      return data;
    });
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify(data),
    };
    return response;
  }
  catch (err) {
    console.log("Error", err);
    return { statusCode: 500 }
  }
};

