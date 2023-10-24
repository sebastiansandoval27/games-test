import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import bodyParser from 'body-parser'
import routes from './routes/routes'

// create and setup express app
const app = express()
app.use(express.json())

// add dotenv
dotenv.config()

// register routes

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

// start express server
app.listen(8080), console.log('Listening at 8080')
