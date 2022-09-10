import express from 'express'
import fileUpload from 'express-fileupload'
import { uploadfile, getFiles, getFile, getFileURL } from './controller/s3.js'
import { db } from './database/db.js'
import  cors  from 'cors'

//routes import
import loginRoute from './routes/login.js'
import signupRoute from './routes/signup.js'
import uploadfileRoute from './routes/uploadFile.js'
import deletefileRoute from './routes/deleteFile.js'
import editfileRoute from './routes/editFile.js'
import allusersRoute from './routes/allUsers.js'
import addfriendRoute from './routes/addFriend.js'
import viewfilesRoute from './routes/viewFiles.js'

const app = express()

//Middlewares
app.set('port', process.env.PORT)
app.use(cors())
app.use(express.json())

// Conection DB 
const dbInitialization = async () => {
    try {
      await db.authenticate();
      console.log('Database is connected...');
    } catch (e) {
      console.log(e);
    }
  };
  
dbInitialization();


app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './uploads'
}))

app.get('/files', async (req,res)  => {
    const result = await getFiles()
    res.json(result.Contents)
})

app.get('/files/:fileName', async (req,res)  => {
    const result = await getFileURL(req.params.fileName)
    res.json({
      url: result
    })
})

app.post('/files', async (req,res)  => {
    console.log('-----------------aqui-----------------------------')
    console.log(req.body)
    const result = await uploadfile(req.files.file)
    res.json({ result })
})

app.get('/', async (req,res)  => {
  res.send('Web App with Javascript NodeJS!')
})

//routes
app.use('/api', loginRoute)
app.use('/api', signupRoute)
app.use('/api', uploadfileRoute)
app.use('/api', deletefileRoute)
app.use('/api', editfileRoute)
app.use('/api', allusersRoute)
app.use('/api', addfriendRoute)
app.use('/api', viewfilesRoute)
export default app
