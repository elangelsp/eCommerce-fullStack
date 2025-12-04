import express from 'express';
import cors from 'cors';
import router from './src/routes/routes.js';

import { testConnection } from './src/db/db.js';
import { insertTestData } from './src/db/dataTest.js';

const app = express();

app.use(cors());

app.use(express.json());

//Rutas
app.use('/api/', router);

const PORT = 4000;

//Base de datos
await testConnection();
//Data test
//await insertTestData();


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});