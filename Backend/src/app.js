const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ['https://prep-ai-ynte.vercel.app', "http://localhost:5173"],
    credentials: true
}))
app.use(cors({...}))
app.set('trust proxy', 1)
res.cookie('token', token, {
  httpOnly: true,
  secure: true,       // must be true in production
  sameSite: 'none',   // must be 'none' for cross-domain
})

/* require all the routes here */
const authRouter = require("./routes/auth.routes")
const interviewRouter = require("./routes/interview.routes")


/* using all the routes here */
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)



module.exports = app
