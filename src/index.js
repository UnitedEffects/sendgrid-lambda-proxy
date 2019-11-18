import 'regenerator-runtime/runtime';
import serverless from 'serverless-http';
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

const config = require('./config');

const app = express();

app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, HEAD, POST, DELETE, PUT, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, api_key, Authorization");
    next();
});

app.get('/health', (req, res) => {
    res.status(200).send('running');
});

app.use(`/${config.SG_VERSION}/*`, async (req, res) => {
    try {
        const aProxy = {
            url: `/${req.params['0']}`,
            method: req.method,
            baseURL: `https://${config.SG_URL}/${config.SG_VERSION}`,
            headers: {
                'content-type': 'application/json',
                'authorization': `bearer ${config.SG_API}`
            },
            data: req.body,
            params: req.query,
            responseType: 'json'
        };
        const response = await axios.request(aProxy);
        return res.status(response.status).json(response.data);
    } catch (error) {
        if (error.response) {
            console.error(error.response);
            return res.status(error.response.status).json(error.response.data);
        }
        console.error(error);
        return res.status(500).json({data: error.message});
    }
});

app.use((req, res) => {
    // fall through 404 response
    res.status(404).json({ message: 'no such path', request: req.url });
});

//app.listen(8080); // <-- for testing
module.exports.handler = serverless(app);