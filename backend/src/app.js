const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('./routes');
const { config } = require('./config');
const verifyJwt = require('./middlewares/verifyJwt');

const PORT = config.server.port;

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.use(helmet());

app.use('/api/v1/users', routes.user);
app.use('/api/v1/tasks', routes.task);

app.get('/api', async (req, res) => {
  return res.status(200).send('Todoly API');
});

app.get('/api/v1/me', verifyJwt, async (req, res) => {
  const { id } = req.payload;

  const user = await db.user.findFirst({
    where: { id: id },
  });

  if (!user) {
    return res.status(404).json({
      status: 404,
      message: 'The requested user does not exist',
    });
  }

  return res.status(200).json(user);
});

app.listen(PORT, () => {
  console.log(`Server up and running on http://localhost:${PORT}🚀`);
});
