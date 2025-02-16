const WebSocket = require('ws');
const fs = require('fs');
const https = require('https');
const logger = require('../../logs/script/logger');
require('dotenv').config({ path: '../config/.env' });

// Load SSL certificate and key
const server = https.createServer({
    cert: fs.readFileSync(process.env.SSL_CERT_PATH),
    key: fs.readFileSync(process.env.SSL_KEY_PATH)
});

// Create WebSocket server
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
    logger.info('New client connected');

    ws.on('message', function incoming(message) {
        logger.info(`Received: ${message}`);
        ws.send(`Echo: ${message}`);
    });

    ws.on('close', () => {
        logger.info('Client disconnected');
    });

    ws.on('error', (error) => {
        logger.error(`Error: ${error.message}`, { stack: error.stack });
    });

    ws.send('Welcome to Eclipse Hotel: The Night of Terrors');
});

server.listen(443, () => {
    logger.info('Server is running on wss://clouddata.thebloxers998.org and port 443');
});
