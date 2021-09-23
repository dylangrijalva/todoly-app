const router = require('express').Router();

router.use('/', (req, res) => {
    return res.status(200).send('📙');
});

module.exports = router;