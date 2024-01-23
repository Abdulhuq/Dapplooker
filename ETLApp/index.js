const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

// Assuming gasPrices is an array of objects with 'date' and 'price' properties
const calculateAverage = (gasPrices) =>
{
    const totalGasPrices = gasPrices.reduce((sum, entry) => sum + entry.price, 0);
    const averageGasPrice = totalGasPrices / gasPrices.length;
    return averageGasPrice;
};

// Assuming transactions is an array of objects representing transactions
const transformData = (transactions) =>
{
    const transformedTransactions = transactions.slice(0, 10).map((transaction) => {
        delete transaction['Max Priority Fee Per Gas'];
        delete transaction['Status'];
        delete transaction['Max Fee Per Gas'];
        delete transaction['Nonce'];
        delete transaction['Gas Used'];
        return transaction;
    });

    return transformedTransactions;
};

// Assuming blocks is an array of objects representing blocks
const extractBlockDetails = (blocks) =>
{
    const blockDetails = blocks.map((block) => ({
        Timestamp : block.timestamp,
        AverageGasPrice : block.averageGasPrice,
        NumberOfTransactions : block.numberOfTransactions,
    }));

    return blockDetails;
};

// Assuming blocks is an array of objects representing blocks and blockNumber is the input parameter
const getBlockInfo = (blocks, blockNumber) =>
{
    const block = blocks.find((block) => block.number === blockNumber);

    if (block)
    {
        const blockInfo = {
            Timestamp : block.timestamp,
            NumberOfTransactions : block.numberOfTransactions,
        };

        return blockInfo;
    }
    else
    {
        return {error : 'Block not found'};
    }
};

// GET API to get all tables
app.get(
    '/api/tables', async(req, res) => {
        try
        {
            // Fetch JSON data
            const response = await axios.get(
                'https://gist.githubusercontent.com/realchoubey/25132ad140df2fffd683db85650e0847/raw');

            const validTables = response.data.__schema.types.filter(
                entityDefinition => entityDefinition.fields !== null &&entityDefinition.fields !== '' &&entityDefinition.fields !== undefined && entityDefinition.fields.length > 0 && ![ 'exclude1', 'exclude2' ].includes(entityDefinition.name.toLowerCase()) && !entityDefinition.name.startsWith('_'));

            res.json(validTables);
        }
        catch (error)
        {
            console.error(error);
            res.status(500).json({error : 'Internal Server Error'});
        }
    });

// 2. GET API to return average gas price of the day
app.get(
    '/api/averageGasPrice', async(req, res) => {
        try
        {
            const response = await axios.get(
                'https://api.dapplooker.com/chart/87596cde-e5df-4a5d-9e72-7592d4861513?api_key=4721550ec26a47cabbf1aa0609ab7de3&output_format=json');
            const averageGasPrice = calculateAverage(response.data.gasPrices);

            res.json({averageGasPrice});
        }
        catch (error)
        {
            console.error(error);
            res.status(500).json({error : 'Internal Server Error'});
        }
    });

// 3. PUT API to transform the current structure and return recent 10 transactions
app.put(
    '/api/transformStructure', async(req, res) => {
        try
        {
            const response = await axios.get(
                'https://api.dapplooker.com/chart/87596cde-e5df-4a5d-9e72-7592d4861513?api_key=4721550ec26a47cabbf1aa0609ab7de3&output_format=json');

            const transformedData = transformData(response.data.transactions);

            res.json({transformedData});
        }
        catch (error)
        {
            console.error(error);
            res.status(500).json({error : 'Internal Server Error'});
        }
    });

// 4. GET API to get block details
app.get(
    '/api/blockDetails', async(req, res) => {
        try
        {
            const response = await axios.get(
                'https://api.dapplooker.com/chart/87596cde-e5df-4a5d-9e72-7592d4861513?api_key=4721550ec26a47cabbf1aa0609ab7de3&output_format=json');

            const blockDetails = extractBlockDetails(response.data.blocks);

            res.json({blockDetails});
        }
        catch (error)
        {
            console.error(error);
            res.status(500).json({error : 'Internal Server Error'});
        }
    });

// 5. GET API to take the input as block number and return its timestamp and number of transactions
app.get(
    '/api/blockDetails/:blockNumber', async(req, res) => {
        try
        {
            const blockNumber = req.params.blockNumber;

            const response = await axios.get(
                'https://api.dapplooker.com/chart/87596cde-e5df-4a5d-9e72-7592d4861513?api_key=4721550ec26a47cabbf1aa0609ab7de3&output_format=json');

            const blockInfo = getBlockInfo(response.data.blocks, blockNumber);

            res.json({blockInfo});
        }
        catch (error)
        {
            console.error(error);
            res.status(500).json({error : 'Internal Server Error'});
        }
    });

app.listen(
    PORT, () => {
        console.log("Server running on port ${PORT}");
    });