const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const uploadRoutes = require('./routes/upload')
const courseRoutes = require('./routes/course')

const app = express();
const PORT = process.env.PORT || 4000

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())

//TEST ROUTE
app.get('/', (req, res) => {
    console.log(process.env.MONGO_USER)
    res.send("test from krish, changeing this shud reflet in v2 after workflow update --- on JAN 15 [FINAL SERVER UPDATE] --- zoom")
})

app.use('/upload', uploadRoutes)
app.use('/course', courseRoutes)


//For Handling any errors
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

//Connecting to MongoDB
mongoose.connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(res => {
    app.listen(PORT, () => {
        console.log('Server Started')
    })
}).catch(err => {
    console.log("Error with connecting to db")
})