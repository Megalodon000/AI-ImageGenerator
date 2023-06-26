import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';
import auth from './routes/auth.js';
import { verifyToken } from './routes/auth.js';


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/auth', auth);
app.use('/api/v1/post',verifyToken, postRoutes);
app.use('/api/v1/dalle',verifyToken, dalleRoutes);

app.get('/', async (req, res) => {
  res.send('Hello from AI Artistry!');
});

const startServer = async () => {
        try {
            connectDB(process.env.MONGODB_URL)
      app.listen(8080, () => console.log('Server started on port http://localhost:8080'));
        }catch(error){
            console.log(error);
        }
  };
  
  startServer();

