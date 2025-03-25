import { config as configDotenv } from 'dotenv';
import app from './app.js';
import connectionToDB from './config/dbConnection.js';
import cloudinary from "cloudinary"

configDotenv();


cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, async() => {
    await connectionToDB();
    console.log(`Server is listening on http://localhost:${PORT}`);
});