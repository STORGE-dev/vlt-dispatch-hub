import express  from "express"
import dotenv from "dotenv"
import morgan from "morgan";
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import authRoute from "./routes/authRoute.js"
import requestRoute from "./routes/requestRoute.js"
import { ConnectDB } from "./config/dbconfig.js";


dotenv.config();



const app = express()//express
ConnectDB()
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use("/api/v1/auth",authRoute)
app.use("/api/v1/requests", requestRoute);
app.use(express.static('public'));

app.use(express.static(path.join(__dirname, "vlt-hub/build")))
app.use(express.static(path.join(__dirname, 'vlt-hub', 'public')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'vlt-hub', 'build', 'index.html'));
});

// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to VISION!</h1>");
// });


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log('****Server Started on '+" PORT:"+ PORT+"****")
})

 