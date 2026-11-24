import 'dotenv/config';
import app from "./src/app.js"; 
import connectToDB from "./src/config/database.js";

connectToDB()
    .catch(err => {
        console.error("Failed to connect to the database:", err);
        process.exit(1); // Exit the process with an error code
    })


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

