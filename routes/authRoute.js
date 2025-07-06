import express from "express";
import  { LoginHandler, RegisterHandler } from "../Controllers/authcontroller.js";
const router = express.Router()


router.post("/signup", RegisterHandler)

//LOGIN

router.post("/login", LoginHandler)



export default router