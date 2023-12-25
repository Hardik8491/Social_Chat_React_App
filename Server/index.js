import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";


// routes
import AuthRoute from './Routes/AuthRoutes.js'
import UserRoute from './Routes/UserRoutes.js'
import PostRoute from './Routes/PostRoutes.js'
import UploadRoute from './Routes/UploadRoutes.js'
import ChatRoute from './Routes/ChatRoutes.js'
import MessageRoute from './Routes/MessageRoutes.js'


const app = express();


// middleware
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// to serve images inside public folder
app.use(express.static('public')); 
app.use('/images', express.static('images'));

dotenv.config();
const PORT = process.env.PORT;

const CONNECTION = process.env.MONGO;
mongoose
  .connect(CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Listening at Mongodb Port ${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));


  app.use('/auth', AuthRoute);
  app.use('/user', UserRoute)
  app.use('/posts', PostRoute)
  app.use('/upload', UploadRoute)
  app.use('/chat', ChatRoute)
  app.use('/message', MessageRoute)
