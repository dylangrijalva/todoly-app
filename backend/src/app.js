const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');
const { config } = require('./config');

const PORT = config.server.port;

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());

app.use('/api/users', routes.user);
app.use('/api/tasks', routes.task);

app.get('/api', async (req, res) => {
	return res.status(200).send('Todoly API');
});

app.listen(PORT, () => {
	console.log(`Server up and running on http://localhost:${PORT}🚀`);
});