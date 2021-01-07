require('dotenv/config')

const express = require('express')
const multer = require('multer')
const router = express.Router();

const AWS = require('aws-sdk')


const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET
})


const pngFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const imageFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const pdfFilter = (req, file, cb) => {
    if (
        file.mimetype === 'application/pdf'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const storage = multer.memoryStorage({
    destination: function (req, file, cb) {
        cb(null, '')
    }
})

const uploadAws = multer({
    storage: storage,
    limits: {
        fileSize: 4000000
    },
    fileFilter: pngFilter
})

const uploadIntro = multer({
    storage: storage,
    limits: {
        fileSize: 4000000
    },
    fileFilter: imageFilter
})

const uploadExperiment = multer({
    storage: storage,
    limits: {
        fileSize: 4000000
    },
    fileFilter: pngFilter
})

const uploadExcercise = multer({
    storage: storage,
    limits: {
        fileSize: 4000000
    },
    fileFilter: pdfFilter
})


router.post('/aws-check', uploadAws.single('file'), (req, res) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `images/${Date.now() + '-' + req.file.originalname}`,
        Body: req.file.buffer,
        ACL: "public-read"
    }

    s3.upload(params, (error, data) => {
        if (error) {
            res.status(500).send(error)
        }
        else {
            console.log("response from AWS", data)
            res.status(200).json({ "location": data.Location })
        }
    })
}
)

router.post('/introduction', uploadIntro.single('file'),
    (req, res) => {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `introduction/${Date.now() + '-' + req.file.originalname + '.png'}`,
            Body: req.file.buffer,
            ACL: "public-read"
        }

        s3.upload(params, (error, data) => {
            if (error) {
                res.status(500).send(error)
            }
            else {
                res.status(200).json({ "location": data.Location })
            }
        })
    })

router.post('/experiment',
    uploadExperiment.single('file'),
    (req, res) => {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `experiment/${Date.now() + '-' + req.file.originalname + '.png'}`,
            Body: req.file.buffer,
            ACL: "public-read"
        }

        s3.upload(params, (error, data) => {
            if (error) {
                res.status(500).send(error)
            }
            else {
                res.status(200).json({ "location": data.Location })
            }
        })
    })

router.post('/excercise',
    uploadExcercise.single('file'),
    (req, res) => {
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `excercise/${Date.now() + '-' + req.file.originalname}`,
            Body: req.file.buffer,
            ACL: "public-read"
        }

        s3.upload(params, (error, data) => {
            if (error) {
                res.status(500).send(error)
            }
            else {
                res.status(200).json({ "location": data.Location })
            }
        })
    })

module.exports = router;