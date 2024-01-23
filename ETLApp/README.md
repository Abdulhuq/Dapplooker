# DappLooker-solutions
# ETL App

## Overview

This project provides a web application backend with several REST APIs to perform various tasks based on the provided JSON source. The APIs fetch data from a specified URL, apply specific logic, and return relevant information. Follow the instructions below to set up and run the server.

## Setup

1. Install Node.js:
   - Visit [Node.js website](https://nodejs.org/) and follow the instructions to install Node.js.

2. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-project.git
   cd your-project

Install dependencies:
bash
Copy code
npm install
Running the Server
Run the following command to start the server:

bash
Copy code
node index.js
The server will be running at http://localhost:3000.

API Endpoints
Get All Tables:

Endpoint: /api/tables
Method: GET
Returns: List of valid tables
Get Average Gas Price of the Day:

Endpoint: /api/averageGasPrice
Method: GET
Returns: Average gas price of the day
Transform Structure and Return Recent 10 Transactions:

Endpoint: /api/transformStructure
Method: PUT
Returns: Transformed data with recent 10 transactions
Get Block Details:

Endpoint: /api/blockDetails
Method: GET
Returns: Block details including timestamp, average gas price, and number of transactions
Get Block Info by Block Number:

Endpoint: /api/blockDetails/:blockNumber
Method: GET
Parameters: blockNumber - Block number
Returns: Timestamp and number of transactions for the specified block