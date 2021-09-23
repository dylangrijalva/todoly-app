const router = require('express').Router();
const { createToken, generateId, hashText } = require('../utils');
const { PrismaClient } = require('@prisma/client');
const db = new PrismaClient();

router.get('/', (req, res) => {
    return res.status(200).send('Users Endpoint🤓!');
});

router.post('/sign_up', async (req, res) => {

    if(!req.body.email || req.body.email === '') return res.status(400).json({
        status: 400,
        message: 'Email address cannot be null or empty'
    });

    if(!req.body.password || req.body.password === '') return res.status(400).json({
        status: 400,
        message: 'Password cannot be null or empty'
    });

    const { email, password } = req.body;

    const existingUser = await db.user.findFirst({
        where: { email: email }
    });

    if(existingUser) return res.status(409).json({
        status: 409,
        message: 'The email is already taken'
    });

    const hashedPassword = await hashText(password);

    const newUser = await db.user.create({
        data: {
            id: generateId(),
            email: email,
            password: hashedPassword
        }
    });

    return res.status(201).json(newUser);
});

module.exports = router;