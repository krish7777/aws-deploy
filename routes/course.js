const express = require('express')
const router = express.Router();


router.get('/test', (req, res) => {
    try {
        res.json({ "test": "ok v3 of api [FINAL of TEST API]" })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
})

module.exports = router