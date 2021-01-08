const express = require('express')
const router = express.Router();


router.get('/test', (req, res) => {
    try {
        res.json({ "test": "ok v2" })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
})

module.exports = router