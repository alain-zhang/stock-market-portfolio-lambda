const yahooFinance = require('yahoo-finance');

exports.handler = async(event) => {
  try {
    // Data passed from the HTTP request is saved as a JSON string in event.body
    // We need to parse it into a Javascript object before we can use it.
    let { ticker } = JSON.parse(event.body);
    let result = await yahooFinance.quote({
      symbol: ticker,
      modules: ['price']
    })
    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
      },
      body: JSON.stringify({
        ticker,
        data: result.price
      }),
    };
    return response;
  }
  catch (err) {
    console.log("Error", err);
    return { statusCode: 500 };
  }
};

