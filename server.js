// Import Express and external middleware
const express = require('express');
const helmet = require("helmet");

//Import custom middleware
const {logger, defaultResponse} = require('./middleware/custom');

// const db = require('./data/dbConfig.js');

// Import specific Routers
const accountRouter = require("./accounts/accountRouter"); 

// Create server
const server = express();

// Use global middleware 
server.use(helmet());
server.use(express.json());
server.use(logger);

// Use specific Routers
server.use("/accts", accountRouter);

// Define default response
server.use(defaultResponse);



module.exports = server;