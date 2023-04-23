const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const router = require('./routers/routers')
const cors = require('cors');


dotenv.config()

mongoose.connect(process.env.DB_ENDPOINT)
    .then((res) => console.log("db connected..."))
    .catch((err) => console.log("Error in connecting db", err))


const app = express()

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(bodyParser.json())
app.use(expressValidator())
app.use('/', router)

const port = process.env.PORT || 8080

app.listen(port, () => console.log("Listening to port", port))