import { connect } from 'mongoose'

const connectDB = () => {
    // mongodb+srv://Federico:password@coderexample.hjzrdtr.mongodb.net/c53145?retryWrites=true&w=majority
   // connect('mongodb+srv://evangelina:73x13puvi1TyTzE0@ecommerce.c5eizil.mongodb.net/')
    connect('mongodb+srv://vanyu77:Joluvimo777@baseseva.hebhslk.mongodb.net/?retryWrites=true&w=majority&appName=BasesEva')
    //connect('mongodb://127.0.0.1:27017/ecommerce')
    console.log('DB conected')
} 

export default connectDB;
