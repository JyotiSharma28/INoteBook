
require('dotenv').config({ path: 'backend/.env' });

const connectToMongo = require('./db')
const express = require('express')
const cors = require('cors')

connectToMongo();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {

    res.status(200).json({ message: "server is running...." });

})

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(PORT, (err) => {
    if (err) {
        console.log("Error occurred while starting the server..." + err);
        return
    }
    console.log(`server started on PORT --> ${PORT}`);
})