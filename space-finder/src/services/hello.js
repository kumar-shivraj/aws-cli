console.log("Hello World!");

exports.main = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify(
      `Hello! I will read from ${ProcessingInstruction.env.TABLE_NAME}`
    ),
  };
};
