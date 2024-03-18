const express = require('express');
const app = express();
const CRON = require('./utils/common/cron-jobs');

const apiRoutes = require('./routes')

const { ServerConfig, Logger, Queue } = require('./config');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Sucessfully started the server on PORT: ${ServerConfig.PORT}`);
    Logger.info("Successfully started the server", "root", {});
    CRON();
    await Queue.connectQueue();
    console.log("queue connected")
});
