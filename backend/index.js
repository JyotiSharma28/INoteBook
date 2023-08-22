const connectToMongo=require('./db')
const expres=require('express')
const cors=require('cors')

connectToMongo();

const app=expres();
const port=5000

app.use(cors())
app.use(expres.json())

app.get('/',(req,res)=>{

    res.status(200).json({message:"server is running...."});
    
})

app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.listen(port, () => {
    console.log(`Server started on port`);
});
