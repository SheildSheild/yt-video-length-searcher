import express from 'express';
import cors from "cors";
import dotenv from 'dotenv';
import videoRoutes from './routes/videoRoutes.js';
import searchRoutes from './routes/search.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.get('/', (req, res) => {
    res.send('Youtube Length Search API is running');
});

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
}));

app.use('/', videoRoutes, searchRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});