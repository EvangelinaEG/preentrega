import { connect } from 'mongoose'
import dotenv from 'dotenv'
import { commander } from '../utils/commander.js'

const { mode } = commander.opts()

dotenv.config({
    path: mode === 'production'? './.env.production' : './.env.development'
})


export const objectConfig = {
   port : process.env.PORT || 8080,
   mongo : process.env.MONGO,
   private_key: process.env.PRIVATE_KEY
}

const connectDB = () => {
    // mongodb+srv://Federico:password@coderexample.hjzrdtr.mongodb.net/c53145?retryWrites=true&w=majority
   // connect('mongodb+srv://evangelina:73x13puvi1TyTzE0@ecommerce.c5eizil.mongodb.net/')
    connect(process.env.MONGO)
    //connect('mongodb://127.0.0.1:27017/ecommerce')
    console.log('DB conected')
} 

export default connectDB;
