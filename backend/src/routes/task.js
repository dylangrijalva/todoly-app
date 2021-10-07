const router = require('express').Router();
const verifyJwt = require('../middlewares/verifyJwt');
const { generateId, toBoolean } = require('../utils');
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

router.use(verifyJwt);

router.get('/', async (req, res) => {
  const { sub: userId } = req.payload;

  const tasks = await db.task.findMany({
    where: {
      userId: userId,
    },
    select: {
      id: true,
      content: true,
      isCompleted: true,
    },
  });

  return res.status(200).json(tasks);
});

router.post('/', async (req, res) => {
  if (!req.body.content || req.body.content === '') {
    return res.status(400).json({
      status: 400,
      message: 'Content cannot be null or empty',
    });
  }

  if (!req.body.isCompleted) {
    return res.status(400).json({
      status: 400,
      message: 'IsCompleted cannot be null',
    });
  }

  let { content, isCompleted } = req.body;
  const { sub: userId } = req.payload;

  isCompleted = toBoolean(isCompleted);

  const newTask = await db.task.create({
    data: {
      id: await generateId(),
      content: content,
      isCompleted: isCompleted,
      userId: userId,
    },
  });

  return res.status(201).json({
    id: newTask.id,
    content: newTask.content,
    isCompleted: newTask.isCompleted
  });
});

router.put('/:id', async (req, res) => {
  if (!req.params.id || req.params.id === '') {
    return res.status(400).json({
      status: 400,
      message: 'You must provide a valid id',
    });
  }

  if (!req.body.content || req.body.content === '') {
    return res.status(400).json({
      status: 400,
      message: 'Content cannot be null or empty',
    });
  }

  if (!req.body.isCompleted) {
    return res.status(400).json({
      status: 400,
      message: 'IsCompleted cannot be null',
    });
  }

  const taskId = req.params.id;
  let { content, isCompleted } = req.body;

  isCompleted = toBoolean(isCompleted);

  const existingTask = await db.task.findFirst({
    select: {
      id: true,
    },
    where: {
      id: taskId,
    },
  });

  if (!existingTask) {
    return res.status(404).json({
      status: 404,
      message: 'The requested task does not exist',
    });
  }

  const updatedTask = await db.task.update({
    where: {
      id: taskId,
    },
    data: {
      content: content,
      isCompleted: isCompleted,
    },
    select: {
      id: true,
      content: true,
      isCompleted: true,
    },
  });

  return res.status(200).json(updatedTask);
});

router.delete('/:id', async (req, res) => {
  if (!req.params.id || req.params.id === '') {
    return res.status(400).json({
      status: 400,
      message: 'You must provide a valid id',
    });
  }

  const taskId = req.params.id;

  const existingTask = await db.task.findFirst({
    select: {
      id: true,
    },
    where: {
      id: taskId,
    },
  });

  if (!existingTask) {
    return res.status(404).json({
      status: 404,
      message: 'The requested task does not exist',
    });
  }

  await db.task.delete({
    where: {
      id: taskId,
    },
  });

  return res.status(204).send();
});

module.exports = router;
