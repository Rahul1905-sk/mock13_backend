const express = require('express')
const { myServer } = require('./configs/db')
const { userRoutes } = require('./routes/User.routes')
const { auth } = require('./middleware/auth.middleware')
const { blogRoutes } = require('./routes/Blog.routes')

require('dotenv').config()
const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.use('/api', userRoutes)
app.use(auth)

app.use('/api/blogs', blogRoutes)



app.listen(PORT, async()=> {

    try {
        await myServer
        console.log('Connected to DB');
    } catch (error) {
        console.log(error);
    }

console.log(`server started at` +' '+PORT);
})