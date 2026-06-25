import express from "express"
import { login, logout, signUp } from "../controllers/auth.controllers.js"

const authRouter=express.Router()

authRouter.post("/signup", signUp)
authRouter.post("/signin", login)
authRouter.post("/logout", logout)

export default authRouter