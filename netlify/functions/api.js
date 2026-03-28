const serverless = require("serverless-http");
const app = require("../../api/index");

// Wrap the Express app as a Netlify Function
module.exports.handler = serverless(app);
