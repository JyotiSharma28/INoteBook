const mongoose=require('mongoose')
// const mongoURI="mongodb://localhost:27017/inotebook"
const mongoURI="mongodb+srv://sjyoti37796:XKY8KH9H0XaHMy33@cluster0.akfrg1n.mongodb.net/?retryWrites=true&w=majority"

const connectToMongo=async()=>{
    mongoose.connect(mongoURI)
}

module.exports=connectToMongo;
